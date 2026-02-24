#! python3
# -*- coding: utf-8 -*-

'''
    翻译json文件
'''

import sys
import json
# from googletrans.models import Translated
from googletrans import Translator

# default code list
code_list = ['ar', 'am', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'en', 'en_GB', 'en_US', 'es', 'es_419', 'et', 'fa', 'fi', 'fil', 'fr', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'it',
             'ja', 'kn', 'ko', 'lt', 'lv', 'ml', 'mr', 'ms', 'nl', 'no', 'pl', 'pt_BR', 'pt_PT', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'sw', 'ta', 'te', 'th', 'tr', 'uk', 'vi', 'zh_CN', 'zh_TW']

# exclude code
exclude_code = []
code_list = list(filter(lambda code: code not in exclude_code, code_list))

# code_list = ['zh_CN']

code_dict = {
    'fil': 'tl',
    'zh_TW': 'zh-tw',
    'zh_CN': 'zh-cn',
    'en_GB': 'en',
}

translator = Translator()

json_path = sys.argv[1]
output_path = './translate_json_output.json'
try:
    output_path = sys.argv[2]
except:
    pass

json_data = {}

try:
    print(': ', json_path)
    file = open(json_path, 'r', encoding='utf8')
    json_data = json.load(file)
except:
    print('load input file error')
    sys.exit(0)


text = ''
for key in json_data:
    value = json_data[key]
    if not type(value) == str:
        print('❌ invalid value: ', value)

    text += value + '\n\n\n\n\n'

print('key number: ', len(json_data.keys()))


output_dict = {}

for code in code_list:
    print('code: ', code)
    dest = code_dict[code] if code in code_dict else code

    translated = None
    count = 0
    while not translated and count < 5:
        try:
            translated = translator.translate(text, dest=dest)
        except KeyboardInterrupt:
            # pass
            sys.exit()
        except:
            count += 1
            print('retry ', count)

    if not translated:
        print('❎ ', code)
        continue

    translated_text = translated.text
    print(translated_text)
    translated_dict = {}
    i = 0
    translated_text_list = translated_text.split('\n\n\n\n\n')
    print('split length: ', len(translated_text_list))
    for key in json_data:
        translated_dict[key] = translated_text_list[i]
        i += 1

    output_dict[code] = translated_dict


output_file = open(output_path, 'w+', encoding='utf8')
output_file.seek(0)
output_file.write(json.dumps(output_dict, indent=4, ensure_ascii=False))
output_file.truncate()
output_file.close()

# print(json_data, output_path)
