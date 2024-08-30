export const filterData = [
    {
        filter_by: 'Venue',
        values: ['In-Person', 'Remote', 'Hybrid']
    },
    {
        filter_by: 'Category',
        values: ['Cloud', 'Cybersecurity', 'Software Engineering', 'Systems Support']
    },
    {
        filter_by: 'Certification',
        values: ['AWS Certified Cloud Practitioner', 'CISCO IT Essentials', 'CISCO Network Essentials', 'CompTIA CySA+', 'Google IT Support Professional Certificate']
    }
];

export const cardsData = [
    {
        "name": "AWS Cloud Practitioner",
        "description": "Learn the basics of AWS Cloud.",
        "category": ["Cloud"],
        "certifications": ["AWS Certified Cloud Practitioner"],
        "partners": ["Amazon"],
        "venues": ["Remote"],
        "start_date": "2024-09-01"
      },
      {
        "name": "CISCO IT Essentials",
        "description": "Introduction to IT and networking.",
        "category": ["Systems Support"],
        "certifications": ["CISCO IT Essentials"],
        "partners": ["Cisco"],
        "venues": ["In-Person"],
        "start_date": "2024-09-15"
      },
      {
        "name": "CompTIA CySA+",
        "description": "Cybersecurity Analyst certification.",
        "category": ["Cybersecurity"],
        "certifications": ["CompTIA CySA+"],
        "partners": ["CompTIA"],
        "venues": ["Hybrid"],
        "start_date": "2024-10-01"
      }
];