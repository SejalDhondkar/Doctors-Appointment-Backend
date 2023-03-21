import requests
import re
from bs4 import BeautifulSoup
from urllib import response
import io 
import urllib
import urllib.request
import urllib.parse
import sys

url = 'https://www.netmeds.com/prescriptions/'
# s = str(input("Enter Medicine: "))
s = str(sys.argv[1])
s_new = s.lower().replace(' ','-')
#s = re.sub("'","-",s)
#s=s.replace("(","-")
#s=s.replace(")","-")
s_new=re.sub("[%$./()+']","-",s_new)
s_new = s_new.replace('-----','-')
s_new = s_new.replace('----','-')
s_new = s_new.replace('---','-')
s_new = s_new.replace('--','-')
print(s_new)

url += s_new
print('')
html_text = requests.get(url).text
soup = BeautifulSoup(html_text, 'lxml')
check=soup.find_all('h2',{'class' : 'title'})
if check == []:
              try:  
                  med_name = soup.find('h1',{'class' : 'black-txt'}).text
              except AttributeError:
                  med_name = "notmentioned" 
              
              try:  
                   med_price = soup.find('span',{'class' : 'price'}).text
              except AttributeError:
                  med_price = "notmentioned" 

              try:  
                  med_gen = soup.find('div',{'class' : 'drug-manu'}).a.text
              except AttributeError:
                  med_gen = "notmentioned" 

              try:  
                  med_manuf = soup.find('span',{'class' : 'drug-manu'}).a.text
              except AttributeError:
                  med_manuf = "notmentioned" 
            
              try:  
                  med_uses = soup.find_all('div',{'class' : 'inner-content'}).li.text
              except AttributeError:
                  med_uses = "Not mentioned" 

print(f'You are looking for : {med_name}')
print(f'Price : {med_price}')
print(f'Generic name for {med_name} is {med_gen}')
print(f'Manufactured by : {med_manuf}')
print(f'{med_name} Uses : {med_uses}')


meds = soup.find_all('div', class_="drug_list")
print(f'Alter brand for {s} are :')
if(len(meds)!= 0):
    for med in meds:
        a = med.find('a').text
        more_info = med.a['href']
        print(f'Medicine Name: {a}')
        print(f'More Info: https://www.netmeds.com/{more_info}')
        print('')
else:
    print(f'There are no alternate medicine brands for {s}')

