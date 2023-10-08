# search_title_filtered()
import sys
import json
from libgen_api import LibgenSearch


print(sys.argv[1])

tf = LibgenSearch()
title_filters = {"Extension": "pdf", "Language": "English"}
titles = tf.search_title_filtered(str(sys.argv[1]), title_filters, exact_match=True)
item_to_download = titles[0]
download_links = tf.resolve_download_links(item_to_download)
# Access individual URLs


print(json.dumps(download_links))
