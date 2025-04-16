import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, BookOpen } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <PageLayout>
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-violet-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
        <svg
          className="absolute top-[-80px] left-[-100px] w-[600px] opacity-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#8b5cf6"
            d="M40.5,-57.6C52.3,-51.6,62.1,-41.4,66.2,-29.6C70.3,-17.9,68.7,-4.5,65.8,8.9C62.8,22.2,58.5,35.6,49.4,44.3C40.3,52.9,26.4,56.9,13.1,60.4C-0.3,63.9,-12.9,66.9,-25.1,63.7C-37.3,60.5,-49.2,51.1,-53.2,39.6C-57.2,28.1,-53.2,14.6,-54.5,1.1C-55.7,-12.4,-62.2,-24.7,-58.4,-34.8C-54.6,-44.8,-40.4,-52.6,-27.1,-57.8C-13.9,-63,-7,-65.6,4.2,-71C15.3,-76.4,30.7,-84.5,40.5,-57.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          Atur Tugas Kuliahmu Lebih Mudah
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          Tugasin bantu kamu nyusun tugas, prioritas, dan deadline kuliah secara rapi dan gampang.
        </p>

        {isAuthenticated ? (
          <div>
            <h2 className="text-xl mb-4 font-medium">Hai, {user?.name} 👋</h2>
            <Link to="/todo-list">
              <Button
                size="lg"
                className="text-base px-6 py-3 transition-transform duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Lihat Tugas Saya
              </Button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <Button
              size="lg"
              className="text-base px-6 py-3 transition-transform duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
          </Link>
        )}
      </motion.section>

      {/* Background grid dots */}
      <div className="absolute inset-0 -z-20 pointer-events-none opacity-10 bg-[radial-gradient(circle,_#a78bfa_1px,_transparent_1px)] [background-size:20px_20px]" />

      {/* Floating blobs */}
      <div className="absolute top-[10%] left-[5%] w-48 h-48 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-[5%] right-[10%] w-32 h-32 bg-purple-300 rounded-full blur-2xl opacity-20 animate-pulse-slow" />

      {/* Feature Section */}
      <section className="py-20 px-4 bg-muted/40 relative z-10">
        <h2 className="text-3xl font-semibold text-center mb-12 text-primary">
          Kenapa pakai Tugasin?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <CheckCircle className="h-8 w-8 text-primary mb-2" />,
              title: 'Task Management',
              desc: 'Buat dan kelola tugas kuliah kamu dengan mudah',
              content:
                'Semua tugas, project, dan deadline dikumpulkan jadi satu sistem manajemen yang efisien.',
              link: isAuthenticated ? '/todo-list' : '/login',
              btn: 'Coba Sekarang',
            },
            {
              icon: <Calendar className="h-8 w-8 text-primary mb-2" />,
              title: 'Stay Organized',
              desc: 'Prioritas dan deadline? Semua tertata rapi',
              content:
                'Atur kategori tugas, deadline, dan tingkat urgensi supaya kamu nggak kelupaan lagi.',
              link: isAuthenticated ? '/todo-list' : '/login',
              btn: 'Lihat Fitur',
            },
            {
              icon: <BookOpen className="h-8 w-8 text-primary mb-2" />,
              title: 'Student Friendly',
              desc: 'Dibuat khusus buat mahasiswa seperti kamu',
              content:
                'Kategorikan tugas berdasarkan mata kuliah, dan lihat progress kamu kapan aja.',
              link: '/about',
              btn: 'Pelajari Lebih Lanjut',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Card className="group shadow-md border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl bg-white dark:bg-slate-950">
                <CardHeader>
                  {item.icon}
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </CardContent>
                <CardFooter>
                  <Link to={item.link} className="w-full">
                    <Button variant="outline" className="w-full hover:scale-[1.03] transition-transform">
                      {item.btn}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
