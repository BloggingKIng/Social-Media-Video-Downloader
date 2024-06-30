import os
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
import threading

from . import __version__, __author__


class FacebookDownloader:
    def __init__(self, video_url, output_filename="", audio=False):
        self.__base_url = "https://getfvid.com"
        self.__home_directory = os.path.expanduser("~")
        __option = webdriver.FirefoxOptions()
        __option.add_argument('--headless')
        self.__driver = webdriver.Firefox(options=__option)
        self.video_url = video_url
        self.output_path = output_filename
        self.audio = audio

    @staticmethod
    def __format_output_filename(user_defined_name) -> str:
        """
        Formats the output file's name.

        :param user_defined_name: User-defined name for the file.
        :return: Formatted/Reconstructed name of the file.
        """
        from datetime import datetime

        dt_now = datetime.now()
        if os.name == "nt":
            output_name = dt_now.strftime(f"{user_defined_name}_%d-%m-%Y %I-%M-%S%p-facebook-downloader.mp4")
        else:
            output_name = dt_now.strftime(f"{user_defined_name}_%d-%m-%Y %I:%M:%S%p-facebook-downloader.mp4")

        return output_name

    def notice(self) -> str:
        """
        Returns the program's license notice and current version.

        :return: License notice.
        :rtype: str
        """
        return f"""
        facebook-downloader v{__version__} Copyright (C) 2022-2023  Richard Mwewa
        
        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
        """

    def __get_download_type_element(self) -> str:
        """
        Gets the web element according to the specified command-line arguments.
        

        ELements
        --------
        - HD: /html/body/div[2]/div/div/div[1]/div/div[2]/div/div[3]/p[1]/a
        - SD: /html/body/div[2]/div/div/div[1]/div/div[2]/div/div[3]/p[2]/a
        - Audio: /html/body/div[2]/div/div/div[1]/div/div[2]/div/div[3]/p[3]/a

        :return: Web element
        """
        if self.audio:
            download_type_element = "/html/body/div[2]/div/div/div[1]/div/div[2]/div/div[3]/p[3]/a"
        else:
            download_type_element = "/html/body/div[2]/div/div/div[1]/div/div[2]/div/div[3]/p[1]/a"

        return download_type_element

    def path_finder(self) -> None:
        """
        Creates the facebook-videos directory.

        :return: None
        """
        # Construct and create the directory if it doesn't already exist
        os.makedirs(os.path.join(self.__home_directory, "facebook-downloader"), exist_ok=True)

    def download_video(self):
        """
        Opens https://getfvid.com with selenium and uses the specified facebook video link as a query.
        """
        # Open the base url.
        self.__driver.get(self.__base_url)

        # Locate the facebook video url entry field.
        url_entry_field = self.__driver.find_element(By.NAME, "url")

        # Write the given facebook video url in the entry field.
        url_entry_field.send_keys(self.video_url)

        # Press ENTER.
        url_entry_field.send_keys(Keys.ENTER)
        print("* Loading web resources... Please wait.")

        # Find the download button (this clicks the first button which returns a video in hd).
        download_btn = WebDriverWait(self.__driver, 20).until(
            expected_conditions.presence_of_element_located((By.XPATH,
                                                             self.__get_download_type_element())))
        # Get the video download url from the download button.
        download_url = download_btn.get_attribute('href')

        # Open the download url and stream the content to a file.

        def download_part(url, start, end, part_num, output_path):
            headers = {'Range': f'bytes={start}-{end}'}
            response = requests.get(url, headers=headers, stream=True)
            response.raise_for_status()
            part_path = f'{output_path}.part{part_num}'
            with open(part_path, 'wb') as part_file:
                for chunk in response.iter_content(chunk_size=65536):  
                    part_file.write(chunk)

        def download_file(url, output_path):
            num_threads = 15
            response = requests.head(url)
            file_size = int(response.headers['Content-Length'])
            part_size = file_size // num_threads

            threads = []
            for i in range(num_threads):
                start = i * part_size
                end = start + part_size - 1 if i < num_threads - 1 else file_size - 1
                thread = threading.Thread(target=download_part, args=(url, start, end, i, output_path))
                threads.append(thread)
                thread.start()

            for thread in threads:
                thread.join()

            with open(output_path, 'wb') as output_file:
                for i in range(num_threads):
                    part_path = f'{output_path}.part{i}'
                    with open(part_path, 'rb') as part_file:
                        output_file.write(part_file.read())
                    os.remove(part_path)

        download_file(download_url, self.output_path)

        # Close driver.
        self.__driver.close()
