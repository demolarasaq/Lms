import { useState, useEffect } from 'react';
import { BookOpen, Clock, Book, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { supabase } from '../../../lib/supabase';

const stats = [
  {
    label: 'Total Borrowed',
    value: '9',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
  },
  {
    label: 'Pending Approvals',
    value: '1',
    icon: Clock,
    color: 'from-amber-500 to-amber-600',
  },
  {
    label: 'Currently Reading',
    value: '0',
    icon: Book,
    color: 'from-emerald-500 to-emerald-600',
  },
];

const quotes = [
  {
    text: "The struggle against colonialism does not end with the act of independence. Rather, independence merely marks a new stage in the struggle for African unity, economic freedom, and cultural independence.",
    author: "Kwame Nkrumah",
    book: "Africa Must Unite",
  },
  {
    text: "To break free from the grip of neocolonialism, it is necessary to decolonize the mind and develop a culture of resistance.",
    author: "Frantz Fanon",
    book: "The Wretched of the Earth",
  },
  {
    text: "We must leave our dreams and abandon our old beliefs and friendships of the time before life began. Let us waste no time in sterile litanies and nauseating mimicry. Leave this Europe where they are never done talking about Man, yet murder men everywhere they find them, at the corner of every one of their own streets, in all the corners of the globe.",
    author: "Frantz Fanon",
    book: "The wretched of the Earth",
  },
  {
    text: "The history of Africa will remain suspended in air and cannot be written correctly until African historians dare to connect it with the history of Egypt.",
    author: "Cheikh Anta Diop",
    book: "The African Origin of Civilization",
  },
  {
    text: "He who feeds you, controls you.",
    author: "Thomas Isidore Sankara",
  },
  {
    text: "Ancient Kemet and other African civilizations laid the foundations of science, mathematics, and philosophy long before the Western world discovered them.",
    author: "Ivan Van Sertima",
    book: "They Came Before Columbus",
  },
  {
    text: "The African continent is the mother of civilization. Africa has always been a source of strength, and our people must never forget their heritage.",
    author: "John Henrik Clarke",
  },
  {
    text: "He who is silent in the face of oppression is a traitor.",
    author: "Amilcar Cabral",
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    book: "Long Walk to Freedom",
  },
  {
    text: "I am not African because I was born in Africa but because Africa was born in me.",
    author: "Kwame Nkrumah",
    book: "Africa Must Unite",
  },
  {
    text: "For Africa to me... is more than a glamorous fact. It is a historical truth. No man can know where he is going unless he knows exactly where he has been and exactly how he arrived at his present place.",
    author: "Maya Angelou",
    book: "All God's Children Need Traveling Shoes",
  },
  {
    text: "The African is conditioned, by the cultural and social institutions of centuries, to a freedom of which Europe has little conception.",
    author: "Jomo Kenyatta",
    book: "Facing Mount Kenya",
  },
  {
    text: "We are Africans and we wish to remain so. We are proud of our African heritage. The new Africa is the land in which millions of people demand the means of life.",
    author: "Patrice Lumumba",
  },
  {
    text: "Until the lions have their own historians, the history of the hunt will always glorify the hunter",
    author: "Chinua Achebe",
  },
  {
    text: "Critical and liberating dialogue, which presupposes action, must be carried on with the oppressed at whatever the stage of their struggle for liberation.",
    author: "Paulo Freire",
    book: "Pedagogy of the oppressed",
  },
  {
    text: "Africa’s future depends on how well its people can use their intellectual heritage to create structures for self-reliance and independence",
    author: "Amos Wilson",
    book: "Blueprint for Black Power",
  },
];

const groupedQuotes: (typeof quotes)[] = [];
for (let i = 0; i < quotes.length; i += 8) {
  groupedQuotes.push(quotes.slice(i, i + 8));
}

export function UserHome() {
  const [userName, setUserName] = useState('...');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
      if (data?.full_name) {
        setUserName(data.full_name);
      } else {
        setUserName(user.email?.split('@')[0] || 'User');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Welcome back, {userName}!</h2>
        <p className="text-slate-600 mt-1">Explore wisdom from the giants of history</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quotes Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900">Visionary Insights</h3>
          <span className="text-sm text-slate-500">Wisdom from the giants of history</span>
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {groupedQuotes.map((quoteGroup, groupIndex) => (
              <CarouselItem key={groupIndex}>
                <div className="grid lg:grid-cols-2 gap-4 h-full content-start">
                  {quoteGroup.map((quote, index) => (
                    <Card key={index} className="bg-white border-slate-200 hover:border-emerald-300 transition-all group h-full">
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex gap-3 h-full">
                          <div className="w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full shrink-0" />
                          <div className="flex-1 flex flex-col justify-between">
                            <p className="text-slate-700 leading-relaxed mb-4 italic">"{quote.text}"</p>
                            <div className="flex items-center justify-between mt-auto">
                              <div>
                                <p className="font-semibold text-slate-900">{quote.author}</p>
                                {quote.book && <p className="text-sm text-slate-500">{quote.book}</p>}
                              </div>
                              <TrendingUp className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
