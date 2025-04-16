import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Calendar,
  Clock,
  Tag,
  Settings
} from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  {
    icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    title: 'Task Management',
    description: 'Create, edit, and organize tasks with intuitive controls. Mark tasks as completed when you\'re done.',
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: 'Deadline Tracking',
    description: 'Set due dates for all your assignments and receive visual reminders as deadlines approach.',
  },
  {
    icon: <Tag className="h-8 w-8 text-primary" />,
    title: 'Categories',
    description: 'Organize tasks by categories like Academic, Personal, and Organization to keep your life structured.',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Priority Levels',
    description: 'Assign priority levels to your tasks to focus on what\'s most important.',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Academic Focus',
    description: 'Designed specifically for students with features that support academic planning and success.',
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: 'Customization',
    description: 'Personalize your experience with theme options and user preferences.',
  },
];

const About: React.FC = () => {
  return (
    <PageLayout>
      <div className="relative py-16 px-4">
        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black" />

        <motion.div initial="hidden" animate="show" variants={fadeIn}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Tugasin</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Membantu mahasiswa mengelola tugas dan deadline dengan lebih baik.
            </p>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
          <div className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Kami Punya Misi Nih 🎯</h2>
            <div className="bg-muted p-6 rounded-xl shadow-md">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tugasin dibuat buat bantu mahasiswa ngadepin ribetnya hidup kuliah. Kami ngerti banget gimana pusingnya ngatur jadwal kuliah, tugas, proyek, dan aktivitas organisasi. Misi kami simpel: sediakan tools yang gampang dipakai tapi tetap powerful — biar hidup kuliah kamu lebih rapi, produktif, dan gak gampang stres.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mb-16">
          <motion.h2
            className="text-2xl font-bold mb-8 text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Fitur Unggulan 🌟
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="mb-16" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
          <h2 className="text-2xl font-bold mb-6 text-center">Kenapa Ini Penting Buat Mahasiswa?</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200">
              <h3 className="text-xl font-medium mb-4">Biar Kuliah Gak Bikin Stress</h3>
              <p>
                Dengan gambaran tugas dan deadline yang jelas, kamu bisa atur waktu belajar tanpa panik. Gak ada lagi SKS dadakan — kamu jadi lebih tenang dan produktif!
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200">
              <h3 className="text-xl font-medium mb-4">Biar Waktu Gak Kebuang Percuma</h3>
              <p>
                Sistem prioritas bantu kamu fokus ke hal-hal penting, dan pelacak deadline bikin kamu selalu on track. Waktu belajar jadi lebih efisien dan hasilnya maksimal.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div className="text-center text-muted-foreground" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
          <p className="italic">“Tugasin — Dibuat untuk mahasiswa, oleh mahasiswa.”</p>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default About;
