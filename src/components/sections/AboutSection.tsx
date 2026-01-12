import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Globe, Heart, Users } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Du học sinh Trung Quốc",
    description: "Sống và học tập tại Trung Quốc, hiểu sâu về văn hóa và ngôn ngữ",
  },
  {
    icon: Globe,
    title: "Phương pháp hiện đại",
    description: "Kết hợp học online linh hoạt với nội dung thực tế, dễ hiểu",
  },
  {
    icon: Heart,
    title: "Đam mê giảng dạy",
    description: "Luôn tận tâm và nhiệt huyết với từng học viên",
  },
  {
    icon: Users,
    title: "Cộng đồng học tập",
    description: "Kết nối với hàng trăm học viên cùng chung đam mê",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Về tôi
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tại sao chọn học với <span className="text-gradient">MeoHi</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Với kinh nghiệm du học và sinh sống tại Trung Quốc, tôi hiểu rõ những khó khăn khi học tiếng Trung và sẽ đồng hành cùng bạn trên hành trình này.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-background p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-medium transition-all duration-300"
            >
              <div className="w-14 h-14 gradient-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={28} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Story teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-background rounded-3xl p-8 md:p-12 border border-border"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Câu chuyện của tôi
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Từ một sinh viên Việt Nam bỡ ngỡ khi đặt chân đến Trung Quốc, đến khi trở thành người đồng hành giúp hàng trăm bạn trẻ chinh phục tiếng Trung. Hành trình này không hề dễ dàng, nhưng mỗi khó khăn đều là bài học quý giá...
              </p>
              <p className="text-sm text-primary font-medium">
                📖 Đọc thêm câu chuyện trong phần Stories
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                <span className="text-muted-foreground">🎬 Video giới thiệu sắp ra mắt</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
