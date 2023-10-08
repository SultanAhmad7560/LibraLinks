from requests_html import HTMLSession
from bs4 import BeautifulSoup
import requests
stash = []

def search_movie(id):
    movie_list = []
    movie = requests.get(f"https://web.fmoviesto.site/search/?q={id}")
    soup = BeautifulSoup(movie.content, "html.parser")
    source_url = soup.find("div",{'class': 'film_list-wrap'}).find_all('a')
    for links in source_url:
        url = links['href']
        title = links['title'].replace("<b>", "").replace("</b>", "")
        if title not in movie_list:
             movie_list.append(title)
             stash.append(title + url)
    
    
    seperate_list = ('\n'.join(movie_list))
    print(seperate_list)
    


def url_movie(id):
    movie = requests.get(f"https://web.fmoviesto.site/search/?q={id}")
    soup = BeautifulSoup(movie.content, "html.parser")
    source_url = soup.find("div",{'class': 'film_list-wrap'}).find_all('a')
    for links in source_url:
        title = links['title'].replace("<b>", "").replace("</b>", "")
        if id.lower() in title.lower(): 
            url = links['href']
            break;
        else:
            print(f"No movie found with ID: {id}")
    
    movielink = requests.get(f"https://web.fmoviesto.site{url}")
    print(f"https://web.fmoviesto.site{url}")
    return None

search_movie("Hotel Transylvania")    
url_movie("Hotel Transylvania: Puppy!")