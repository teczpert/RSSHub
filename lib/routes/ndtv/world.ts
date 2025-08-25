import { Route } from '@/types';
import ofetch from '@/utils/ofetch';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/world',
    name: 'World News',
    url: 'ndtv.com',
    maintainers: ['teczpert'],
    example: '/ndtv/world',
    parameters: {},
    description: 'NDTV World News',
    categories: ['traditional-media'],
    
    handler: async (ctx) => {
        const response = await ofetch('https://www.ndtv.com/world');
        const $ = load(response);
        
        const items = $('.news_Itm').toArray().map((item) => {
            const element = $(item);
            const titleElement = element.find('h2 a, h3 a').first();
            const title = titleElement.text().trim();
            const link = titleElement.attr('href');
            const description = element.find('.news_Itm-cont p').text().trim();
            
            return {
                title,
                link: link?.startsWith('http') ? link : `https://www.ndtv.com${link}`,
                description,
                pubDate: new Date(), // NDTV doesn't show clear timestamps, use current time
            };
        });

        return {
            title: 'NDTV World News',
            link: 'https://www.ndtv.com/world',
            description: 'Latest world news from NDTV',
            item: items,
        };
    },
};
