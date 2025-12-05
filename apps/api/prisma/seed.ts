import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create test users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.upsert({
    where: { login: 'alice' },
    update: {},
    create: {
      login: 'alice',
      name: 'Alice Martin',
      email: 'alice@example.com',
      password: hashedPassword,
      xpTotal: 450,
      streak: 3,
      hearts: 5,
      gems: 120,
    },
  });

  const bob = await prisma.user.upsert({
    where: { login: 'bob' },
    update: {},
    create: {
      login: 'bob',
      name: 'Bob Durant',
      email: 'bob@example.com',
      password: hashedPassword,
      xpTotal: 280,
      streak: 1,
      hearts: 4,
      gems: 75,
    },
  });

  console.log('✅ Initial users created:', { alice: alice.login, bob: bob.login });

  // Create Teams first
  const teams = [
    { name: 'Les Eco-Warriors', description: 'Champions de la durabilité' },
    { name: 'Code Vert', description: 'Développeurs éco-responsables' },
    { name: 'Digital Guardians', description: 'Protecteurs du numérique' },
    { name: 'Green Coders', description: 'Codeurs verts' },
    { name: 'Tech for Good', description: 'Technologie au service du bien' },
  ];

  const createdTeams = [];
  for (const teamData of teams) {
    const team = await prisma.team.upsert({
      where: { name: teamData.name },
      update: {},
      create: teamData,
    });
    createdTeams.push(team);
  }

  console.log(`✅ Teams created: ${createdTeams.length}`);

  // Create more users for leaderboard with team assignments
  const moreUsers = [
    { login: 'maxpro', name: 'Alexandre Mercier', email: 'max@example.com', xpTotal: 15240, streak: 24, hearts: 5, gems: 850, teamId: createdTeams[0].id },
    { login: 'sarah_dev', name: 'Sophie Lefebvre', email: 'sarah@example.com', xpTotal: 12890, streak: 18, hearts: 4, gems: 720, teamId: createdTeams[0].id },
    { login: 'lucas22', name: 'Lucas Fontaine', email: 'lucas@example.com', xpTotal: 11450, streak: 15, hearts: 5, gems: 650, teamId: createdTeams[1].id },
    { login: 'emma_code', name: 'Emma Rousseau', email: 'emma@example.com', xpTotal: 9870, streak: 12, hearts: 3, gems: 580, teamId: null }, // Solo
    { login: 'thomas_g', name: 'Thomas Girard', email: 'thomas@example.com', xpTotal: 8320, streak: 10, hearts: 5, gems: 490, teamId: createdTeams[2].id },
    { login: 'julie_m', name: 'Julie Blanc', email: 'julie@example.com', xpTotal: 7650, streak: 9, hearts: 4, gems: 430, teamId: createdTeams[2].id },
    { login: 'pierre90', name: 'Pierre Moreau', email: 'pierre@example.com', xpTotal: 6890, streak: 8, hearts: 5, gems: 380, teamId: null }, // Solo
    { login: 'marie_l', name: 'Marie Roux', email: 'marie@example.com', xpTotal: 5920, streak: 7, hearts: 3, gems: 320, teamId: createdTeams[3].id },
    { login: 'antoine_r', name: 'Antoine Faure', email: 'antoine@example.com', xpTotal: 5120, streak: 6, hearts: 5, gems: 280, teamId: createdTeams[4].id },
    { login: 'chloe_b', name: 'Chloé Vincent', email: 'chloe@example.com', xpTotal: 4560, streak: 5, hearts: 4, gems: 240, teamId: null }, // Solo
    { login: 'raphael_p', name: 'Raphaël Boyer', email: 'raphael@example.com', xpTotal: 3980, streak: 5, hearts: 5, gems: 210, teamId: createdTeams[1].id },
    { login: 'lea_d', name: 'Léa Garnier', email: 'lea@example.com', xpTotal: 3420, streak: 4, hearts: 3, gems: 180, teamId: null }, // Solo
    { login: 'hugo_s', name: 'Hugo Chevalier', email: 'hugo@example.com', xpTotal: 2890, streak: 4, hearts: 5, gems: 150, teamId: createdTeams[0].id },
    { login: 'camille_t', name: 'Camille Dupuis', email: 'camille@example.com', xpTotal: 2340, streak: 3, hearts: 4, gems: 120, teamId: createdTeams[1].id },
    { login: 'nathan_m', name: 'Nathan Lambert', email: 'nathan@example.com', xpTotal: 1890, streak: 3, hearts: 5, gems: 95, teamId: null }, // Solo
    { login: 'lisa_g', name: 'Lisa Bonnet', email: 'lisa@example.com', xpTotal: 1450, streak: 2, hearts: 3, gems: 70, teamId: createdTeams[3].id },
    { login: 'kevin_f', name: 'Kevin Perrin', email: 'kevin@example.com', xpTotal: 1120, streak: 2, hearts: 5, gems: 55, teamId: null }, // Solo
    { login: 'clara_c', name: 'Clara Morel', email: 'clara@example.com', xpTotal: 890, streak: 1, hearts: 4, gems: 40, teamId: createdTeams[4].id },
    { login: 'theo_b', name: 'Théo Fournier', email: 'theo@example.com', xpTotal: 670, streak: 1, hearts: 5, gems: 30, teamId: null }, // Solo
    { login: 'manon_r', name: 'Manon Simon', email: 'manon@example.com', xpTotal: 520, streak: 1, hearts: 3, gems: 25, teamId: createdTeams[2].id },
  ];

  for (const userData of moreUsers) {
    await prisma.user.upsert({
      where: { login: userData.login },
      update: {},
      create: {
        ...userData,
        password: hashedPassword,
      },
    });
  }

  console.log('✅ Users created:', { total: moreUsers.length + 2, withTeams: moreUsers.filter(u => u.teamId).length, solo: moreUsers.filter(u => !u.teamId).length });

  // Create Units (Paths) with Lessons
  const units = [
    {
      title: 'Accessibilité Numérique',
      description: 'Apprends les bases de l\'accessibilité web',
      domain: 'ACCESSIBILITY',
      orderIndex: 0,
      isCheckpoint: false,
      lessons: [
        {
          title: 'Introduction WCAG',
          type: 'QUIZ',
          orderIndex: 0,
          xpReward: 10,
          hearts: 5,
        },
        {
          title: 'Semantic HTML',
          type: 'PRACTICE',
          orderIndex: 1,
          xpReward: 15,
          hearts: 5,
        },
        {
          title: 'ARIA Labels',
          type: 'QUIZ',
          orderIndex: 2,
          xpReward: 10,
          hearts: 5,
        },
        {
          title: 'Keyboard Navigation',
          type: 'PRACTICE',
          orderIndex: 3,
          xpReward: 20,
          hearts: 5,
        },
        {
          title: 'Color Contrast',
          type: 'QUIZ',
          orderIndex: 4,
          xpReward: 15,
          hearts: 5,
        },
      ],
    },
    {
      title: 'Logiciels Libres',
      description: 'Découvre l\'open source et ses principes',
      domain: 'OPEN_SOURCE',
      orderIndex: 1,
      isCheckpoint: false,
      lessons: [
        {
          title: 'What is Open Source?',
          type: 'READING',
          orderIndex: 0,
          xpReward: 10,
          hearts: 5,
        },
        {
          title: 'Git Basics',
          type: 'PRACTICE',
          orderIndex: 1,
          xpReward: 20,
          hearts: 5,
        },
        {
          title: 'GitHub Workflow',
          type: 'QUIZ',
          orderIndex: 2,
          xpReward: 15,
          hearts: 5,
        },
        {
          title: 'Open Source Licenses',
          type: 'READING',
          orderIndex: 3,
          xpReward: 10,
          hearts: 5,
        },
        {
          title: 'Contributing to Projects',
          type: 'PRACTICE',
          orderIndex: 4,
          xpReward: 25,
          hearts: 5,
        },
      ],
    },
    {
      title: 'Durabilité Numérique',
      description: 'Comprends l\'impact environnemental du numérique',
      domain: 'SUSTAINABILITY',
      orderIndex: 2,
      isCheckpoint: true,
      lessons: [
        {
          title: 'Digital Carbon Footprint',
          type: 'READING',
          orderIndex: 0,
          xpReward: 10,
          hearts: 5,
        },
        {
          title: 'Green Coding Basics',
          type: 'QUIZ',
          orderIndex: 1,
          xpReward: 15,
          hearts: 5,
        },
        {
          title: 'Energy-Efficient Algorithms',
          type: 'PRACTICE',
          orderIndex: 2,
          xpReward: 25,
          hearts: 5,
        },
        {
          title: 'Sustainable Infrastructure',
          type: 'READING',
          orderIndex: 3,
          xpReward: 10,
          hearts: 5,
        },
        {
          title: 'Eco-Friendly Practices',
          type: 'QUIZ',
          orderIndex: 4,
          xpReward: 20,
          hearts: 5,
        },
        {
          title: 'Carbon Measurement',
          type: 'PRACTICE',
          orderIndex: 5,
          xpReward: 30,
          hearts: 5,
        },
      ],
    },
    {
      title: 'Sobriété Numérique',
      description: 'Réduis le gaspillage numérique',
      domain: 'DIGITAL_SOBRIETY',
      orderIndex: 3,
      isCheckpoint: false,
      lessons: [
        {
          title: 'Digital Minimalism',
          type: 'READING',
          orderIndex: 0,
          xpReward: 10,
          hearts: 5,
        },
        {
          title: 'Optimize Images',
          type: 'PRACTICE',
          orderIndex: 1,
          xpReward: 20,
          hearts: 5,
        },
        {
          title: 'Reduce HTTP Requests',
          type: 'QUIZ',
          orderIndex: 2,
          xpReward: 15,
          hearts: 5,
        },
        {
          title: 'Lazy Loading',
          type: 'PRACTICE',
          orderIndex: 3,
          xpReward: 25,
          hearts: 5,
        },
        {
          title: 'Caching Strategies',
          type: 'QUIZ',
          orderIndex: 4,
          xpReward: 15,
          hearts: 5,
        },
      ],
    },
    {
      title: 'DevOps Responsable',
      description: 'Pratiques DevOps durables',
      domain: 'RESPONSIBLE_DEVOPS',
      orderIndex: 4,
      isCheckpoint: false,
      lessons: [
        {
          title: 'CI/CD Basics',
          type: 'READING',
          orderIndex: 0,
          xpReward: 10,
          hearts: 5,
        },
        {
          title: 'Docker Optimization',
          type: 'PRACTICE',
          orderIndex: 1,
          xpReward: 25,
          hearts: 5,
        },
        {
          title: 'Carbon-Aware Deployment',
          type: 'QUIZ',
          orderIndex: 2,
          xpReward: 20,
          hearts: 5,
        },
        {
          title: 'Monitoring & Metrics',
          type: 'PRACTICE',
          orderIndex: 3,
          xpReward: 30,
          hearts: 5,
        },
        {
          title: 'Infrastructure as Code',
          type: 'QUIZ',
          orderIndex: 4,
          xpReward: 15,
          hearts: 5,
        },
      ],
    },
    {
      title: 'Checkpoint Final',
      description: 'Test tes connaissances globales',
      domain: 'ACCESSIBILITY',
      orderIndex: 5,
      isCheckpoint: true,
      lessons: [
        {
          title: 'Final Assessment - Part 1',
          type: 'QUIZ',
          orderIndex: 0,
          xpReward: 50,
          hearts: 5,
        },
        {
          title: 'Final Assessment - Part 2',
          type: 'QUIZ',
          orderIndex: 1,
          xpReward: 50,
          hearts: 5,
        },
        {
          title: 'Practical Challenge',
          type: 'PRACTICE',
          orderIndex: 2,
          xpReward: 100,
          hearts: 5,
        },
      ],
    },
  ];

  for (const unitData of units) {
    const { lessons, orderIndex, ...unitInfo } = unitData;

    const unit = await prisma.unit.upsert({
      where: { 
        domain_order: {
          domain: unitInfo.domain as any,
          order: orderIndex
        }
      },
      update: {},
      create: {
        title: unitInfo.title,
        description: unitInfo.description,
        domain: unitInfo.domain as any,
        order: orderIndex,
        isCheckpoint: unitInfo.isCheckpoint,
      },
    });

    for (const lessonData of lessons) {
      const { orderIndex: lessonOrder, hearts, ...lessonInfo } = lessonData;
      
      await prisma.lesson.upsert({
        where: {
          unitId_order: {
            unitId: unit.id,
            order: lessonOrder
          }
        },
        update: {},
        create: {
          title: lessonInfo.title,
          description: `Learn about ${lessonInfo.title}`,
          type: lessonInfo.type as any,
          unitId: unit.id,
          order: lessonOrder,
          xpReward: lessonInfo.xpReward,
          heartCost: 0,
          difficulty: 1,
          content: {
            type: lessonInfo.type,
            questions: [
              {
                question: `Question about ${lessonInfo.title}`,
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 0,
                explanation: 'This is the explanation'
              }
            ]
          },
        },
      });
    }

    console.log(`✅ Created unit: ${unit.title} with ${lessons.length} lessons`);
  }

  // Mark some lessons as completed for Alice
  const aliceLessons = await prisma.lesson.findMany({
    take: 5,
    orderBy: { order: 'asc' },
  });

  for (const lesson of aliceLessons) {
    await prisma.lessonAttempt.create({
      data: {
        userId: alice.id,
        lessonId: lesson.id,
        result: 'PASS',
        xpEarned: lesson.xpReward,
        errorsCount: 0,
        heartsUsed: 0,
      },
    });
  }

  console.log(`✅ Marked ${aliceLessons.length} lessons as completed for Alice`);

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
