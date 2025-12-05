import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data
  await prisma.eventLog.deleteMany();
  await prisma.lessonAttempt.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.teamBadge.deleteMany();
  await prisma.domainProgress.deleteMany();
  await prisma.activeBooster.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.storeItem.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();

  // Create badges
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        title: 'Inclusivité Actée',
        description: 'Complété 5 leçons d\'accessibilité',
        icon: '♿',
        rarity: 'COMMON',
        criteria: {
          type: 'LESSONS_COMPLETED',
          domain: 'ACCESSIBILITY',
          count: 5
        }
      }
    }),
    prisma.badge.create({
      data: {
        title: 'Libre & Communautaire',
        description: 'Contribué à une issue/PR validée',
        icon: '🔓',
        rarity: 'RARE',
        criteria: {
          type: 'MISSION_VERIFIED',
          domain: 'OPEN_SOURCE',
          count: 1
        }
      }
    }),
    prisma.badge.create({
      data: {
        title: 'Sobriété Pratique',
        description: 'Amélioré le score Eco-index',
        icon: '🌱',
        rarity: 'COMMON',
        criteria: {
          type: 'MISSION_VERIFIED',
          domain: 'SUSTAINABILITY',
          count: 1
        }
      }
    }),
    prisma.badge.create({
      data: {
        title: 'Village Résilient',
        description: 'Maintenu un streak de 7 jours',
        icon: '🔥',
        rarity: 'EPIC',
        criteria: {
          type: 'STREAK',
          count: 7
        }
      }
    }),
    prisma.badge.create({
      data: {
        title: 'Maître NIRD',
        description: 'Atteint 1000 XP total',
        icon: '👑',
        rarity: 'LEGENDARY',
        criteria: {
          type: 'XP_THRESHOLD',
          threshold: 1000
        }
      }
    })
  ]);

  console.log(`✅ Created ${badges.length} badges`);

  // Create store items
  const storeItems = await Promise.all([
    prisma.storeItem.create({
      data: {
        title: 'Boost XP x2',
        description: 'Double XP pendant 24h',
        type: 'BOOST_XP',
        costGems: 50,
        effect: { multiplier: 2, duration: 86400 },
        icon: '⚡',
        available: true
      }
    }),
    prisma.storeItem.create({
      data: {
        title: 'Restaurer Cœurs',
        description: 'Restaure tous les cœurs immédiatement',
        type: 'RESTORE_HEART',
        costGems: 25,
        effect: { restore: 'full' },
        icon: '❤️',
        available: true
      }
    }),
    prisma.storeItem.create({
      data: {
        title: 'Protection Streak',
        description: 'Protège ton streak pendant 1 jour',
        type: 'FREEZE_STREAK',
        costGems: 30,
        effect: { duration: 86400 },
        icon: '🛡️',
        available: true
      }
    })
  ]);

  console.log(`✅ Created ${storeItems.length} store items`);

  // Create users
  const password = await bcrypt.hash('password123', 10);
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        login: 'alice',
        name: 'Alice Dupont',
        email: 'alice@example.com',
        password,
        roles: ['CAPTAIN', 'DEVELOPER'],
        hearts: 5,
        streak: 3,
        xpTotal: 150,
        gems: 50,
        league: 'BRONZE'
      }
    }),
    prisma.user.create({
      data: {
        login: 'bob',
        name: 'Bob Martin',
        email: 'bob@example.com',
        password,
        roles: ['DEVELOPER'],
        hearts: 4,
        streak: 1,
        xpTotal: 80,
        gems: 20,
        league: 'BRONZE'
      }
    }),
    prisma.user.create({
      data: {
        login: 'charlie',
        name: 'Charlie Leroux',
        email: 'charlie@example.com',
        password,
        roles: ['VERIFIER', 'PEDAGOGUE'],
        hearts: 5,
        streak: 5,
        xpTotal: 250,
        gems: 75,
        league: 'SILVER'
      }
    })
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create team
  const team = await prisma.team.create({
    data: {
      name: 'Les Résistants du Numérique',
      description: 'Équipe dédiée à la transition NIRD',
      totalPoints: 230,
      momentumScore: 15.5,
      teamXP: 480
    }
  });

  // Add users to team
  await prisma.user.update({
    where: { id: users[0].id },
    data: { teamId: team.id }
  });

  await prisma.user.update({
    where: { id: users[1].id },
    data: { teamId: team.id }
  });

  console.log(`✅ Created team: ${team.name}`);

  // Create units and lessons
  const accessibilityUnit = await prisma.unit.create({
    data: {
      title: 'Accessibilité Numérique',
      description: 'Apprends les bases de l\'accessibilité web',
      domain: 'ACCESSIBILITY',
      order: 1,
      isCheckpoint: false
    }
  });

  const accessibilityLessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: accessibilityUnit.id,
        title: 'Introduction WCAG',
        description: 'Découvre les principes WCAG',
        type: 'QUIZ',
        difficulty: 1,
        xpReward: 10,
        heartCost: 0,
        order: 1,
        content: {
          quiz: [
            {
              id: '1',
              question: 'Que signifie WCAG ?',
              options: [
                'Web Content Accessibility Guidelines',
                'Web Common Access Guide',
                'World Content Access Group',
                'Web Creator Accessibility Guide'
              ],
              correctAnswer: 0,
              explanation: 'WCAG signifie Web Content Accessibility Guidelines - les directives d\'accessibilité du contenu web.'
            },
            {
              id: '2',
              question: 'Quel est le niveau minimum recommandé pour un site public ?',
              options: ['A', 'AA', 'AAA', 'Aucun'],
              correctAnswer: 1,
              explanation: 'Le niveau AA est le niveau minimum recommandé pour les sites publics.'
            }
          ]
        }
      }
    }),
    prisma.lesson.create({
      data: {
        unitId: accessibilityUnit.id,
        title: 'Navigation au Clavier',
        description: 'Maîtrise la navigation clavier',
        type: 'PRACTICE',
        difficulty: 2,
        xpReward: 15,
        heartCost: 1,
        order: 2,
        content: {
          practiceInstructions: 'Teste la navigation au clavier sur ton site. Assure-toi que tous les éléments interactifs sont accessibles via Tab.',
          quiz: [
            {
              id: '1',
              question: 'Quelle touche permet de naviguer entre les éléments ?',
              options: ['Tab', 'Enter', 'Space', 'Echap'],
              correctAnswer: 0,
              explanation: 'La touche Tab permet de naviguer entre les éléments interactifs.'
            }
          ]
        }
      }
    }),
    prisma.lesson.create({
      data: {
        unitId: accessibilityUnit.id,
        title: 'Lecteurs d\'écran',
        description: 'Comprends les lecteurs d\'écran',
        type: 'READING',
        difficulty: 1,
        xpReward: 10,
        heartCost: 0,
        order: 3,
        content: {
          readingContent: `# Lecteurs d'écran

Les lecteurs d'écran sont des technologies d'assistance qui lisent le contenu à voix haute pour les utilisateurs malvoyants.

## Bonnes pratiques :
- Utiliser des balises HTML sémantiques
- Ajouter des attributs ARIA quand nécessaire
- Fournir des alternatives textuelles pour les images
- Structurer le contenu avec des titres logiques

## Lecteurs d'écran populaires :
- NVDA (gratuit, Windows)
- JAWS (payant, Windows)
- VoiceOver (Mac/iOS)
- TalkBack (Android)`,
          quiz: [
            {
              id: '1',
              question: 'Quel attribut HTML fournit une description pour les images ?',
              options: ['title', 'alt', 'description', 'label'],
              correctAnswer: 1,
              explanation: 'L\'attribut alt fournit une alternative textuelle pour les images.'
            }
          ]
        }
      }
    })
  ]);

  console.log(`✅ Created unit with ${accessibilityLessons.length} lessons`);

  // Create Open Source unit
  const openSourceUnit = await prisma.unit.create({
    data: {
      title: 'Logiciels Libres',
      description: 'Exploration des logiciels open source',
      domain: 'OPEN_SOURCE',
      order: 2,
      isCheckpoint: false
    }
  });

  const openSourceLessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: openSourceUnit.id,
        title: 'Philosophie du Libre',
        description: 'Comprends les 4 libertés essentielles',
        type: 'QUIZ',
        difficulty: 1,
        xpReward: 10,
        heartCost: 0,
        order: 1,
        content: {
          quiz: [
            {
              id: '1',
              question: 'Combien y a-t-il de libertés fondamentales dans le logiciel libre ?',
              options: ['2', '3', '4', '5'],
              correctAnswer: 2,
              explanation: 'Il y a 4 libertés fondamentales : utiliser, étudier, modifier, redistribuer.'
            },
            {
              id: '2',
              question: 'Quelle licence est copyleft ?',
              options: ['MIT', 'GPL', 'BSD', 'Apache'],
              correctAnswer: 1,
              explanation: 'La GPL (GNU General Public License) est une licence copyleft.'
            }
          ]
        }
      }
    }),
    prisma.lesson.create({
      data: {
        unitId: openSourceUnit.id,
        title: 'Contribuer à l\'Open Source',
        description: 'Fais ta première contribution',
        type: 'STORY',
        difficulty: 2,
        xpReward: 20,
        heartCost: 1,
        order: 2,
        content: {
          storyText: 'Tu découvres un bug dans une bibliothèque open source que tu utilises. Que fais-tu ?',
          storyChoices: [
            {
              text: 'Ignorer et trouver une alternative',
              consequence: 'Tu perds du temps à chercher. Le bug persiste pour tout le monde.',
              xpModifier: -5
            },
            {
              text: 'Créer une issue détaillée sur GitHub',
              consequence: 'Excellent ! L\'équipe peut maintenant corriger le bug.',
              xpModifier: 5
            },
            {
              text: 'Corriger le bug et proposer une PR',
              consequence: 'Parfait ! Tu contribues activement à la communauté.',
              xpModifier: 10
            }
          ]
        }
      }
    })
  ]);

  console.log(`✅ Created Open Source unit with ${openSourceLessons.length} lessons`);

  // Create checkpoint unit
  const checkpointUnit = await prisma.unit.create({
    data: {
      title: 'Checkpoint NIRD',
      description: 'Valide tes connaissances',
      domain: 'ACCESSIBILITY',
      order: 3,
      isCheckpoint: true,
      requiredUnitId: accessibilityUnit.id
    }
  });

  const checkpointLesson = await prisma.lesson.create({
    data: {
      unitId: checkpointUnit.id,
      title: 'Boss Challenge : Audit Accessibilité',
      description: 'Réalise un audit complet',
      type: 'PRACTICE',
      difficulty: 3,
      xpReward: 50,
      heartCost: 2,
      order: 1,
      content: {
        practiceInstructions: `# Audit Accessibilité Complet

Réalise un audit d'accessibilité sur ton site avec Lighthouse et Pa11y.

## Objectifs :
- Score Accessibility >= 90 sur Lighthouse
- 0 erreurs critiques sur Pa11y
- Navigation clavier complète
- Contrastes WCAG AA minimum

## Soumets ton rapport d'audit au format JSON.`
      }
    }
  });

  console.log(`✅ Created checkpoint unit`);

  // Create missions
  const missions = await Promise.all([
    prisma.mission.create({
      data: {
        title: 'Améliorer Lighthouse Accessibilité',
        description: 'Obtenir un score >= 90 sur Lighthouse Accessibility',
        categoryNIRD: 'ACCESSIBILITY',
        points: 100,
        xpReward: 50,
        gemsReward: 25,
        difficulty: 2,
        status: 'AVAILABLE',
        requirements: [
          {
            type: 'LIGHTHOUSE_SCORE',
            criteria: 'accessibility',
            threshold: 90
          }
        ]
      }
    }),
    prisma.mission.create({
      data: {
        title: 'Remplacer une dépendance propriétaire',
        description: 'Identifier et remplacer une bibliothèque propriétaire par une alternative libre',
        categoryNIRD: 'OPEN_SOURCE',
        points: 150,
        xpReward: 75,
        gemsReward: 40,
        difficulty: 3,
        status: 'AVAILABLE',
        requirements: [
          {
            type: 'MANUAL_REVIEW',
            criteria: 'Doit inclure une justification de la migration'
          }
        ]
      }
    }),
    prisma.mission.create({
      data: {
        title: 'Optimiser l\'Eco-index',
        description: 'Réduire l\'empreinte carbone du site',
        categoryNIRD: 'SUSTAINABILITY',
        points: 120,
        xpReward: 60,
        gemsReward: 30,
        difficulty: 2,
        status: 'AVAILABLE',
        requirements: [
          {
            type: 'CODE_QUALITY',
            criteria: 'Eco-index score improvement'
          }
        ]
      }
    }),
    prisma.mission.create({
      data: {
        title: 'Contribution OSS documentée',
        description: 'Contribuer à un projet open source avec documentation',
        categoryNIRD: 'OPEN_SOURCE',
        points: 200,
        xpReward: 100,
        gemsReward: 50,
        difficulty: 4,
        status: 'AVAILABLE',
        requirements: [
          {
            type: 'MANUAL_REVIEW',
            criteria: 'PR merged ou issue validée'
          }
        ]
      }
    })
  ]);

  console.log(`✅ Created ${missions.length} missions`);

  // Create some lesson attempts for Alice
  await prisma.lessonAttempt.create({
    data: {
      userId: users[0].id,
      lessonId: accessibilityLessons[0].id,
      result: 'PASS',
      errorsCount: 0,
      xpEarned: 10,
      heartsUsed: 0,
      answers: { q1: 0, q2: 1 }
    }
  });

  await prisma.lessonAttempt.create({
    data: {
      userId: users[0].id,
      lessonId: accessibilityLessons[1].id,
      result: 'PASS',
      errorsCount: 0,
      xpEarned: 15,
      heartsUsed: 0,
      answers: { q1: 0 }
    }
  });

  // Create domain progress for Alice
  await prisma.domainProgress.create({
    data: {
      userId: users[0].id,
      domain: 'ACCESSIBILITY',
      xp: 25,
      level: 1,
      lessonsCompleted: 2,
      missionsCompleted: 0
    }
  });

  console.log('✅ Created lesson attempts and domain progress');

  // Create some event logs
  await Promise.all([
    prisma.eventLog.create({
      data: {
        type: 'LESSON_COMPLETED',
        userId: users[0].id,
        payload: {
          lessonTitle: 'Introduction WCAG',
          xpEarned: 10
        }
      }
    }),
    prisma.eventLog.create({
      data: {
        type: 'TEAM_JOINED',
        userId: users[0].id,
        teamId: team.id,
        payload: {
          teamName: team.name,
          role: 'CAPTAIN'
        }
      }
    })
  ]);

  console.log('✅ Created event logs');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
