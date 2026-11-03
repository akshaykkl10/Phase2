export const projects = [
    'Bamboo',
    'Pandora', 
    'Mickey',
    'Thesus',
    'WordMax',
    'JP Race',
    'Insurance'
]

type IssueProp = {
    title: string;
    level: 'low' | 'medium' | 'high' | 'neutral';
}

export const issues: IssueProp[] = [
    {title: 'Broken DB', level: 'high'},
    {title: 'Broken UI', level: 'medium'},
    {title: 'UI displacement', level: 'low'},
    {title: 'Cache remover', level: 'neutral'},
    {title: 'Malware resistance', level: 'high'},

]