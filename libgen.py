# search_title_filtered()

from libgen_api import LibgenSearch

tf = LibgenSearch()
title_filters = {"Extension": "pdf", "Language": "English"}
titles = tf.search_title_filtered("Harry Potter and the prisoner of azkaban", title_filters, exact_match=True)
item_to_download = titles[0]
download_links = tf.resolve_download_links(item_to_download)
print(download_links)
