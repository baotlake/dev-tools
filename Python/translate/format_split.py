#! python3
# -*- encoding: utf8 -*-

'''
分割文本，生成内容和模版json
'''


import json
from format import split


name = 'sidebar_des'

text = '''The ChatGPT sidebar is your AI assistant 🤖💬that you can use while browsing any website.
   
   🎉🎉🎉Supports  GPT-4 for Plus user (New!) 🎉🎉🎉
 
Top 10 other reasons to choose ChatGPT Sidebar (ChatGPT is a product of OpenAI)
     
1️⃣ Easy to access ChatGPT 
     ✅ Supports ChatGPT-3.5 API key
     ✅ Supports  GPT-4 for Plus user (New!)
2️⃣ Theme
     ✅ Supports Dark/Light mode
3️⃣ Enhance search page
     ✅ Customize search page prompts(the only one in 
    the market)
     ✅Supports all popular search engines, including Google, Bing duckduckgo etc 
     ✅Supports turn on/off search page panel 
4️⃣ Sidebar
     ✅ Access sidebar from in-page icon
     ✅ Access sidebar from right click menu 
     ✅ Access sidebar from the extension icon
5️⃣  ChatGPT response page:
     ✅ Markdown rendering
     ✅ Code highlights
     ✅ Stop generating response
     ✅ Copy response to clipboard

6️⃣ ChatGPT response page:
     ✅ Markdown rendering
     ✅ Code highlights
     ✅ Stop generating response
     ✅ Copy response to clipboard

7️⃣  Many features to  enhance your reading
8️⃣  Many features to enhance your writing 
9️⃣  Easy to use
🔟  Most importantly,  your voice matters! 🗣 & continuous improvements 



The ChatGPT sidebar can function as both your reading 📖  and writing📝  assistant. 
ChatGPT response page:

📖Here are some examples of how you can use ChatGPT sidebar as a reading assistant:
      📰👀Summarize an article
     🔍📄 Find similar pages
     🤔💡Explain any concepts
     🖥️👨‍💻Explain code for programmers
     🌍🔤 Translate to any language
📝The ChatGPT sidebar can also act as your writing assistant when you write notes, Google Docs, emails, and more. Here are some useful use cases for the writing assistant:
     ✅📚Correct grammar
     🔄💬 Rephrase content
    📝➡️📚Expand content
    💰📝 Generate Ads scripts
    🎥📝Write video scripts

The ChatGPT sidebar comes with various preset prompt templates that are optimized for your web activities. Additionally, you can add any prompt template you like and use it on any webpage.
'''

split_dict = split(text)


scheme_file = open('./scheme_' + name + '.json', 'w+', encoding='utf8')
scheme_file.seek(0)
scheme_file.write(json.dumps(
    split_dict['parts'], indent=4, ensure_ascii=False))
scheme_file.truncate()
scheme_file.close()

content_file = open('./content_' + name + '.json', 'w+', encoding='utf8')
content_file.seek(0)
content_file.write(json.dumps(
    split_dict['content'], indent=4, ensure_ascii=False))
content_file.truncate()
content_file.close()
