from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
import json
import time

app = FastAPI(
    title="LinkedIn Jobs Scraper API Pro",
    description="API optimisée pour le scraping d'offres LinkedIn",
    version="2.0.0"
)

logging.basicConfig(
    filename="scraping.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


class JobResponse(BaseModel):
    title: str
    company: str
    location: str
    link: str
    description: Optional[str] = None


class ErrorResponse(BaseModel):
    detail: str


def setup_webdriver():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--disable-webrtc")
    options.add_argument("--use-fake-ui-for-media-stream")
    options.add_argument("--use-fake-device-for-media-stream")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    options.page_load_strategy = "eager"

    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)

    return webdriver.Chrome(options=options)


def process_job(job_element, driver):
    try:
        title = job_element.find("h3", class_="base-search-card__title").get_text(strip=True)
        company = job_element.find("h4", class_="base-search-card__subtitle").get_text(strip=True)
        location = job_element.find("span", class_="job-search-card__location").get_text(strip=True)
        link = job_element.find("a", class_="base-card__full-link")["href"]

        # Fetch description using JavaScript
        description = driver.execute_script(f"""
            try {{
                const xhr = new XMLHttpRequest();
                xhr.open('GET', '{link}', false);
                xhr.send();

                const parser = new DOMParser();
                const doc = parser.parseFromString(xhr.responseText, 'text/html');
                return doc.querySelector('.description__text')?.innerText.trim();
            }} catch (e) {{
                return null;
            }}
        """)

        return {
            "title": title,
            "company": company,
            "location": location,
            "link": link,
            "description": description
        }

    except Exception as e:
        logging.error(f"Job processing error: {str(e)}")
        return None


@app.get(
    "/jobs/",
    response_model=List[JobResponse],
    responses={
        500: {"model": ErrorResponse, "description": "Erreur de scraping"},
        400: {"model": ErrorResponse, "description": "Paramètres invalides"},
        429: {"model": ErrorResponse, "description": "Trop de requêtes"}
    }
)
async def scrape_jobs(
        job_title: str = Query(..., min_length=2, examples=["Data Science"]),
        location: str = Query(..., min_length=2, examples=["Paris"]),
        pages: int = Query(1, gt=0, le=5)
):
    driver = None
    try:
        driver = setup_webdriver()
        driver.get(f"https://www.linkedin.com/jobs/search/?keywords={job_title}&location={location}")


        last_height = 0
        retries = 0
        for _ in range(pages):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(0.5)

            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                retries += 1
                if retries > 2:
                    break
                time.sleep(1)
            else:
                retries = 0
                last_height = new_height

            try:
                WebDriverWait(driver, 1).until(
                    EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Show more')]"))
                ).click()
            except:
                pass

        soup = BeautifulSoup(driver.page_source, "lxml")
        job_elements = soup.find_all("div", class_="base-search-card")

        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = [executor.submit(process_job, job, driver) for job in job_elements]
            results = [f.result() for f in futures if f.result()]

        return results

    except Exception as e:
        logging.error(f"Scraping failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error during scraping"
        )
    finally:
        if driver:
            driver.quit()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1    ", port=8000)