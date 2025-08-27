import type { Mystery } from '../types';

export const mysteries = ['Joyful', 'Luminous', 'Sorrowful', 'Glorious'];
export const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const prayers = {
  apostlesCreed:
    'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
  ourFather:
    'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
  hailMary:
    'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
  gloryBeFatimaPrayer: `Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen. 
    \nO my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy.`,
  hailHolyQueen:
    'Hail, Holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this, our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ.',
};

export const MYSTERY_SETS: Record<
  'Joyful' | 'Sorrowful' | 'Glorious' | 'Luminous',
  Mystery[]
> = {
  Joyful: [
    {
      id: 'joyful-1',
      title: 'The Annunciation',
      scripture: 'Luke 1:26–38',
      meditation:
        'Mary humbly accepts God’s will. Pray for openness to God’s plan in your life.',
    },
    {
      id: 'joyful-2',
      title: 'The Visitation',
      scripture: 'Luke 1:39–56',
      meditation:
        'Mary brings Christ to Elizabeth — pray for reaching out to others in need.',
    },
    {
      id: 'joyful-3',
      title: 'The Nativity',
      scripture: 'Luke 2:1–20',
      meditation:
        'Christ is born; pray with gratitude for God coming near to us in humility.',
    },
    {
      id: 'joyful-4',
      title: 'The Presentation',
      scripture: 'Luke 2:22–38',
      meditation:
        'Jesus is presented in the Temple; pray for obedience and dedication to God.',
    },
    {
      id: 'joyful-5',
      title: 'The Finding in the Temple',
      scripture: 'Luke 2:41–50',
      meditation:
        'Jesus is found in the Temple; pray for wisdom and seeking God above all.',
    },
  ],
  Luminous: [
    {
      id: 'luminous-1',
      title: 'The Baptism of the Lord',
      scripture: 'Matthew 3:13–17',
      meditation:
        'Jesus is baptized; pray to remember your own baptism and mission in Christ.',
    },
    {
      id: 'luminous-2',
      title: 'The Wedding at Cana',
      scripture: 'John 2:1–11',
      meditation:
        "Jesus changes water into wine; pray for trust in Jesus' care for daily needs.",
    },
    {
      id: 'luminous-3',
      title: 'The Proclamation of the Kingdom',
      scripture: 'Mark 1:14–15',
      meditation:
        'Jesus proclaims the Kingdom; pray for conversion and living the Gospel.',
    },
    {
      id: 'luminous-4',
      title: 'The Transfiguration',
      scripture: 'Matthew 17:1–9',
      meditation:
        'Jesus revealed in glory; pray for strength in times of trial and faith.',
    },
    {
      id: 'luminous-5',
      title: 'The Institution of the Eucharist',
      scripture: 'Matthew 26:26–29',
      meditation:
        'Jesus gives himself in the Eucharist; pray for reverence and gratitude.',
    },
  ],
  Sorrowful: [
    {
      id: 'sorrowful-1',
      title: 'The Agony in the Garden',
      scripture: 'Matthew 26:36–46',
      meditation:
        'Jesus prays in sorrow; pray for perseverance in suffering and trust in God.',
    },
    {
      id: 'sorrowful-2',
      title: 'The Scourging at the Pillar',
      scripture: 'John 19:1',
      meditation:
        'Jesus endures suffering; pray for the grace to accept sacrifice for others.',
    },
    {
      id: 'sorrowful-3',
      title: 'The Crowning with Thorns',
      scripture: 'Mark 15:16–20',
      meditation:
        'Jesus mocked and crowned with thorns; pray for humility and faithfulness.',
    },
    {
      id: 'sorrowful-4',
      title: 'The Carrying of the Cross',
      scripture: 'John 19:17',
      meditation:
        'Jesus carries the cross; offer up your burdens and join them to his sacrifice.',
    },
    {
      id: 'sorrowful-5',
      title: 'The Crucifixion',
      scripture: 'John 19:25–30',
      meditation:
        'Jesus dies for us; pray for love, forgiveness, and the hope of resurrection.',
    },
  ],
  Glorious: [
    {
      id: 'glorious-1',
      title: 'The Resurrection',
      scripture: 'Matthew 28:1–10',
      meditation:
        'Christ rises from the dead; pray for hope and joy in new life with God.',
    },
    {
      id: 'glorious-2',
      title: 'The Ascension',
      scripture: 'Acts 1:6–11',
      meditation:
        'Jesus ascends to the Father; pray for longing to be united with God.',
    },
    {
      id: 'glorious-3',
      title: 'The Descent of the Holy Spirit',
      scripture: 'Acts 2:1–4',
      meditation:
        'The Spirit empowers the Church; pray for guidance and boldness in faith.',
    },
    {
      id: 'glorious-4',
      title: 'The Assumption of Mary',
      scripture: 'Revelation 12 (image)',
      meditation:
        'Mary assumed into glory; pray for hope in the promise of eternal life.',
    },
    {
      id: 'glorious-5',
      title: 'The Coronation of Mary',
      scripture: 'Revelation 12 (image)',
      meditation:
        'Mary crowned Queen; pray for her intercession and maternal care.',
    },
  ],
};
