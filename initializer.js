const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function initialize() {
  const classesList = [
    "None",
    'chapainawabganj',
    'barishal metro',
    'bhola',
    'chuadanga',
    'chandpur',
    'bogura',
    'coxsbazar',
    'chattogram',
    'chatto metro',
    'brahmanbaria',
    'feni',
    'cumilla',
    'gazipur metro',
    'dinajpur',
    'gopalganj',
    'faridpur',
    'dhaka',
    'gaibandha',
    'gazipur',
    'dhaka metro',
    'khagrachhari',
    'khulna metro',
    'jamalpur',
    'habiganj',
    'jhalakathi',
    'joypurhat',
    'kishoreganj',
    'jashore',
    'khulna',
    'jhenaidah',
    'meherpur',
    'lalmonirhat',
    'magura',
    'manikganj',
    'munshiganj',
    'kushtia',
    'madaripur',
    'moulvibazar',
    'lakshmipur',
    'kurigram',
    'nilphamari',
    'narsingdi',
    'pabna',
    'mymensingh',
    'noakhali',
    'netrokona',
    'narail',
    'naogaon',
    'narayanganj',
    'natore',
    'rajshahi',
    'panchagarh',
    'rangpur',
    'satkhira',
    'patuakhali',
    'raj metro',
    'rangamati',
    'pirojpur',
    'rajbari',
    'rangpur metro',
    'tangail',
    'thakurgaon',
    'sylhet',
    'sylhet metro',
    'sherpur',
    'bagerhat',
    'sirajganj',
    'sunamganj',
    'bandarban',
    'shariatpur',
    'barguna',
    'barishal',
  ];

  try {
    for (const className of classesList) {
      await prisma.classes.create({
        data: {
          name: className,
        },
      });
    }
    console.log('Classes added successfully');
  } catch (error) {
    console.error('Error adding classes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initialize();
