
import React from 'react';
import { BookOpen, CheckCircle2, Calendar, Clock, Tag, Settings } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const About: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: 'Task Management',
      description: 'Create, edit, and organize tasks with intuitive controls. Mark tasks as completed when you\'re done.'
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: 'Deadline Tracking',
      description: 'Set due dates for all your assignments and receive visual reminders as deadlines approach.'
    },
    {
      icon: <Tag className="h-8 w-8 text-primary" />,
      title: 'Categories',
      description: 'Organize tasks by categories like Academic, Personal, and Organization to keep your life structured.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Priority Levels',
      description: 'Assign priority levels to your tasks to focus on what\'s most important.'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: 'Academic Focus',
      description: 'Designed specifically for students with features that support academic planning and success.'
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: 'Customization',
      description: 'Personalize your experience with theme options and user preferences.'
    }
  ];

  return (
    <PageLayout>
      <div className="py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Tugasin</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Membantu mahasiswa mengelola tugas dan deadline dengan lebih baik.
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Kami Punya misi nih</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-lg">
            Student Task Master dibuat khusus buat bantuin mahasiswa ngadepin ribetnya kehidupan kuliah. Kita paham banget gimana pusingnya ngatur jadwal kuliah, tugas numpuk, proyek yang gak kelar-kelar, plus kegiatan di luar kelas. Misi kita simpel: nyediain tools yang gampang dipakai tapi tetep powerful, biar kamu bisa lebih rapi ngatur tugas, gak gampang stres, dan hidup kuliah jadi lebih terkontrol.
            </p>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Fitur Unggulan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Gimana ini bisa nolong Mahasiswa?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-medium mb-4">Biar Kuliah Gak Bikin Stress</h3>
              <p>
              Kalau kamu punya gambaran jelas soal semua tugas dan deadline, nyusun waktu belajar jadi lebih gampang. Gak perlu panik ngerjain mepet deadline atau SKS dadakan. Kamu jadi tahu apa yang harus dikerjain dan kapan harus kelar—lebih tenang, lebih terkontrol, dan gak gampang stres.
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-medium mb-4">Biar Waktu Gak Kebuang Percuma</h3>
              <p>
              Sistem prioritas bantu kamu fokus ke hal-hal yang paling penting duluan, sedangkan fitur pelacak deadline pastiin kamu gak ketinggalan tugas penting. Hasilnya? Waktu belajar jadi lebih terarah, gak banyak yang kebuang, dan pastinya makin produktif!
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-muted-foreground">
          <p>
           Tugasin - Dibuat untuk mahasiswa, oleh mahasiswa.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
