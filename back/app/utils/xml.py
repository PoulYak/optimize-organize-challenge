from ..service import facility

import xmltodict


def create_facilities_from_xml(data):
    objects = xmltodict.parse(data)['facilities']['facility']
    if type(objects) == list:
        for i in objects:
            if 'tags' in i:
                tags = i.pop('tags')
                if type(tags['tag']) == list:
                    i.update({'tags': []})
                    for tag in tags['tag']:
                        i['tags'].append(tag)
                else:
                    i.update({'tags': [tags['tag']]})
            else:
                i.update({'tags': []})
            facility.create(media=[], **i)
    else:
        if 'tags' in objects:
            tags = objects.pop('tags')
            if type(tags['tag']) == list:
                objects.update({'tags': []})
                for tag in tags['tag']:
                    objects['tags'].append(tag)
            else:
                objects.update({'tags': [tags['tag']]})
        else:
            objects.update({'tags': []})
        facility.create(media=[], **objects)
