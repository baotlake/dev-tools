#! python3
# -*- ecoding: utf8 -*-

from format import concat
import json

name = 'sidebar_des'
scheme_path = 'scheme_' + name + '.json'
contents_path = 'contents_' + name + '.json'
output_path = 'output_' + name + '.json'


scheme_file = open(scheme_path, 'r', encoding='utf8')
scheme = json.load(scheme_file)

contents_file = open(contents_path, 'r', encoding='utf8')
contents = json.load(contents_file)

# print(scheme, len(scheme))

data = {code: concat(scheme, contents[code]) for code in contents.keys()}


output_file = open(output_path, 'w+', encoding='utf8')
output_file.seek(0)
output_file.write(json.dumps(data, indent=4, ensure_ascii=False))
output_file.truncate()
output_file.close()
