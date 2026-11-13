"""Shared public entity metadata. Facts must match visible website copy."""
import json
BASE='https://keystonegrowth.org'
SLUGS={'en':['services/paid-advertising/','services/websites-landing-pages/','services/crm-automation/'],'es':['servicios/publicidad-digital/','servicios/sitios-web-landing-pages/','servicios/crm-automatizacion/']}
def graph(lang,title,description,path,service=None):
 org={'@type':'Organization','@id':BASE+'/#organization','name':'Keystone Growth','url':BASE+'/','logo':{'@type':'ImageObject','url':BASE+'/assets/keystone-touch-icon.png','width':180,'height':180},'email':'aaron@keystonegrowth.org','description':'Founder-led paid advertising, websites, landing pages and CRM automation for businesses in the United States and Latin America.','founder':{'@id':BASE+'/#aaron'},'areaServed':[{'@type':'Country','name':'United States'},{'@type':'Place','name':'Latin America'}],'knowsLanguage':['en','es']}
 person={'@type':'Person','@id':BASE+'/#aaron','name':'Aaron Brenes','jobTitle':'Founder','worksFor':{'@id':BASE+'/#organization'},'image':BASE+'/assets/aaron-brenes.webp'}
 website={'@type':'WebSite','@id':BASE+'/#website','name':'Keystone Growth','url':BASE+'/','publisher':{'@id':BASE+'/#organization'},'inLanguage':['en','es']}
 webpage={'@type':'WebPage','@id':BASE+path+'#webpage','url':BASE+path,'name':title,'description':description,'inLanguage':lang,'isPartOf':{'@id':BASE+'/#website'},'about':{'@id':BASE+'/#organization'}}
 entities=[org,person,website,webpage]
 if service:
  entities.append({'@type':'Service','@id':BASE+path+'#service','name':service,'serviceType':service,'description':description,'provider':{'@id':BASE+'/#organization'},'url':BASE+path,'areaServed':org['areaServed']})
  entities.append({'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Inicio' if lang=='es' else 'Home','item':BASE+'/'+lang+'/'},{'@type':'ListItem','position':2,'name':service,'item':BASE+path}]})
  webpage['mainEntity']={'@id':BASE+path+'#service'}
 return json.dumps({'@context':'https://schema.org','@graph':entities},ensure_ascii=False).replace('</','<\\/')
