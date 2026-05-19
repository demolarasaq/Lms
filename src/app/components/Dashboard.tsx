import { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Card } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
import { supabase } from "../../lib/supabase";

const stats = [
  {
    label: "Total Books",
    value: "20",
    change: "+12% from last month",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
  },
  {
    label: "Total Users",
    value: "3",
    change: "+2 new this week",
    icon: Users,
    color: "from-purple-500 to-purple-600",
  },
  {
    label: "Pending Requests",
    value: "1",
    change: "Needs attention",
    icon: Clock,
    color: "from-amber-500 to-amber-600",
  },
  {
    label: "Active Borrows",
    value: "0",
    change: "All books available",
    icon: CheckCircle,
    color: "from-emerald-500 to-emerald-600",
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
    text: "He who feeds you, controls you",
    author: "Thomas Sankara",
    book: "",
  },
  {
    text: "He who is silent in the face of oppression is a traitor",
    author: "Almicar Cabral",
    book: "",
  },
  {
    text: "We are Africans and we wish to remain so. We are proud of our African heritage. The new Africa is the land in which millions of people demand the means of life.",
    author: "Patrice Lumumba",
    book: "",
  },
  {
    text: "No, we do not want to catch up with anyone. What we want to do is to go forward all the time, night and day, in the company of Man, in the company of all men. The caravan should not be stretched out, for in that case, each line will hardly see those who precede it; and men who no longer recognize each other meet less and less together and talk to eachother less and less",
    author: "Frantz Fanon",
    book: "The Wretched of the Earth",
  },
  {
    text: "Until the lions have their own historians, the history of the hunt will always glorify the hunter",
    author: "Chinua Achebe",
    book: "",
  },
  {
    text: "Imperialism leaves behind germs of rot which we must detect and remove from our land and our minds",
    author: "Frantz Fanon",
    book: "The Wretched of the Earth",
  },
  {
    text: "Critical and liberating dialogue, which presupposes action, must be carried on with the oppressed at whatever the stage of their struggle for liberation. The content of that dialogue can and should vary in accordance with historical conditions and the level at which the oppressed perceive reality. But to substitute monologue, slo gans, and communiques for dialogue is to attempt to liberate the oppressed with the instruments of domestication. Attempting to liberate the oppressed without their reflective participation in the act of liberation is to treat them as objects which must be saved from a burning building; it is to lead them into the populist pitfall and transform them into masses which can be manipulated",
    author: "Paulo Freire",
    book: "Pedagogy of the oppressed",
  },
  {
    text: "Come, brothers, we have far too much work to do for us to play the game of rear-guard. Europe has done what she set out to do and on the whole she has done it well; let us stop blaming her, but let us say firmly that she should not make such a song and dance about it. We have no more to fear; so let us stop envying her",
    author: "Frantz Fanon",
    book: "The Wretched of the Earth",
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

const recentActivity = [
  {
    user: "John Doe",
    action: "borrowed",
    book: "The Wretched of the Earth",
    time: "2 hours ago",
  },
  {
    user: "Jane Smith",
    action: "returned",
    book: "Africa Must Unite",
    time: "5 hours ago",
  },
  {
    user: "Mike Johnson",
    action: "requested",
    book: "Class Struggle in Africa",
    time: "1 day ago",
  },
];

export function Dashboard() {
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    const { data, error } = await supabase
      .from('borrows')
      .select('id, status, borrow_date, profiles(full_name), books(title)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setPendingRequests(data);
    }
  };

  const handleAction = async (borrowId: string, newStatus: 'approved' | 'rejected') => {
    setLoadingAction(borrowId);
    try {
      const { error } = await supabase
        .from('borrows')
        .update({ status: newStatus })
        .eq('id', borrowId);
      
      if (!error) {
        fetchPendingRequests();
      } else {
        alert("Failed to update status");
      }
    } finally {
      setLoadingAction(null);
    }
  };

  const dynamicStats = [
    { ...stats[0] },
    { ...stats[1] },
    {
      label: "Pending Requests",
      value: pendingRequests.length.toString(),
      change: pendingRequests.length > 0 ? "Needs attention" : "All caught up",
      icon: Clock,
      color: "from-amber-500 to-amber-600",
    },
    { ...stats[3] }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Welcome back, kofo!
          </h2>
          <p className="text-slate-600 mt-1">
            Here's what's happening with your library today.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span className="text-sm text-slate-600">System Status: </span>
          <span className="text-sm font-semibold text-emerald-600">
            Healthy
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dynamicStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-white border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">{stat.change}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quotes Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">
              Visionary Insights
            </h3>
            <span className="text-sm text-slate-500">
              Wisdom from the giants of history
            </span>
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
                      <Card
                        key={index}
                        className="bg-white border-slate-200 hover:border-indigo-300 transition-all group h-full"
                      >
                        <div className="p-6 h-full flex flex-col">
                          <div className="flex gap-3 h-full">
                            <div className="w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full shrink-0" />
                            <div className="flex-1 flex flex-col justify-between">
                              <p className="text-slate-700 leading-relaxed mb-4 italic">
                                "{quote.text}"
                              </p>
                              <div className="flex items-center justify-between mt-auto">
                                <div>
                                  <p className="font-semibold text-slate-900">
                                    {quote.author}
                                  </p>
                                  <p className="text-sm text-slate-500">
                                    {quote.book}
                                  </p>
                                </div>
                                <TrendingUp className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
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

        {/* Pending Approvals */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Pending Approvals
          </h3>
          <Card className="bg-white border-slate-200">
            <div className="divide-y divide-slate-100">
              {pendingRequests.length === 0 ? (
                <div className="p-4 text-sm text-slate-500 text-center py-8">
                  <CheckCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  No pending requests right now.
                </div>
              ) : (
                pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">
                          <span className="font-semibold">{req.profiles?.full_name || 'Unknown User'}</span> requested
                        </p>
                        <p className="text-sm text-slate-600 truncate mt-1">
                          {req.books?.title || 'Unknown Book'}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(req.borrow_date || new Date()).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
                            onClick={() => handleAction(req.id, 'approved')}
                            disabled={loadingAction === req.id}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 hover:bg-red-50 flex-1 border-red-100"
                            onClick={() => handleAction(req.id, 'rejected')}
                            disabled={loadingAction === req.id}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 border-0 mt-4">
            <div className="p-6 text-white">
              <h4 className="font-semibold mb-4">Quick Insights</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">
                    Books borrowed this month
                  </span>
                  <span className="font-bold">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">
                    Average reading time
                  </span>
                  <span className="font-bold">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">
                    Most popular category
                  </span>
                  <span className="font-bold">History</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
