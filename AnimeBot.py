from requests_html import HTMLSession
from bs4 import BeautifulSoup
import requests
import sys
stash = []



def search_anime(id):
        
        anime_list = []
        anime = requests.get(f"https://animerush.in/anime/?search-keywords={id}")
        soup = BeautifulSoup(anime.content, "html.parser")  
        source_url = soup.find("div",{'class': 'film_list-wrap'}).find_all('a')
        
        for links in source_url:
            if "-dub/" not in links["href"]:
                url = links['href']
                print(links['data-jname'])
                if links['data-jname'] not in anime_list: 
                    anime_list.append(links['data-jname'])
                    stash.append(links['data-jname'] + url)
        
        
        seperate_list = ('\n'.join(anime_list))
        
        
        return seperate_list


def get_anime_episode(id, episode):
      
      

        dlink = id + '/anime/'

        
        for links in stash:
            names = links.split(',')
            if any(dlink in s for s in names):
                  dlink = names
                  print(dlink)
                  break

        
        original_string = dlink[0]  
        substrings = original_string.split('/')  
        newdlink = '/'.join(substrings[-3:])  
        
       
        
        

        animelink = requests.get(f"https://animerush.in/watch/{newdlink}ep{episode}/")    
       
        
        
        soup = BeautifulSoup(animelink.content, "html.parser")

        source_url = soup.find("div",{'class': 'player-controls'}).find_all('a')
        
        for links in source_url:
            if "/download/" in links["href"]:
                url = links['href']
                break
       
        downloadlink = requests.get(f"https://animerush.in{url}")

        soup2 = BeautifulSoup(downloadlink.content, "html.parser")    
        source_url2 = soup2.find("div",{'class': 'mirror_link'}).find_all('a')       

        for links2 in source_url2:
            url2 = links2['href']
        
        print(url2)





if(str(sys.argv[1]) == "0"):
     mySt = search_anime(str(sys.argv[2]))
     print(mySt)
elif(str(sys.argv[1]) == "1"):
    name = str(sys.argv[2])
    episode = str(sys.argv[3])
    print(name)
    print(episode)
    search_anime(name)
    get_anime_episode(name, episode)

