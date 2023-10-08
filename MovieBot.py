from requests_html import HTMLSession
from bs4 import BeautifulSoup
import requests
import sys
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
    return seperate_list
    


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
 
    link = "https://web.fmoviesto.site" + url
    return link


flag = str(sys.argv[1])

if flag == "0":
    list = search_movie(str(sys.argv[2]))
    print(list)
elif flag == "1":
    url = url_movie(str(sys.argv[2]))
    print(url)
