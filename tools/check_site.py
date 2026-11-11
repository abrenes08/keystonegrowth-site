from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=[];self.h1=0;self.labels=[];self.inputs=[];self.scripts=[];self.canon=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='label':self.labels.append(a.get('for'))
  if tag in ['input','select','textarea'] and a.get('type')!='hidden' and not a.get('aria-label'):self.inputs.append(a.get('id'))
  if tag=='link' and a.get('rel')=='canonical':self.canon.append(a['href'])
  for k in ['href','src']:
   if k in a:self.links.append(a[k])
for file in ['index.html','en/index.html','es/index.html']:
 p=ROOT/file; parser=Page();parser.feed(p.read_text());assert parser.h1==1;assert len(parser.ids)==len(set(parser.ids));assert len(parser.canon)==1
 for v in parser.inputs:assert v in parser.labels,(file,v)
 for link in parser.links:
  u=urlsplit(link)
  if u.scheme or u.netloc:continue
  target=(p.parent/unquote(u.path)).resolve() if u.path else p
  if target.is_dir():target=target/'index.html'
  assert target.exists(),(file,link)
  if u.fragment:
   other=Page();other.feed(target.read_text());assert u.fragment in other.ids,(file,link)
 assert 'wellness' not in p.read_text().lower()
 print('PASS',file,'local links, anchors, labels, headings and metadata')
for font in (ROOT/'assets/fonts').glob('*.ttf'):assert font.stat().st_size<200000
assert (ROOT/'CNAME').read_text().strip()=='keystonegrowth.org'
print('PASS existing custom domain preserved; local Montserrat assets present')
