#! python3
# -*- encoding: utf8 -*-

import os
from PIL import Image
import click

source_path = '/Users/baotlake/Studio/ours.io/country-flags-main/png100px'

target_path = '/Users/baotlake/Studio/ours.io/country-flags-main/png60px'


files = os.listdir(source_path)

for file in files:
    file_path = source_path + '/' + file
    # print(file_path)

    im = Image.open(file_path)
    im.thumbnail((40,40))
    im.save(target_path + '/' + file)


def thumbnail():
    pass
