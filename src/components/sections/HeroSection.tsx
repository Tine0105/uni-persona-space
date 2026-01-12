import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Facebook, Music2 } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen gradient-hero flex items-center pt-16"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            >
              Du học sinh Trung Quốc 🇨🇳
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Xin chào, tôi là{" "}
              <span className="text-gradient">MeoHi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Chiêu sinh tiếng Trung online - Giúp bạn chinh phục tiếng Trung một cách dễ dàng và hiệu quả nhất!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl">
                Bắt đầu học ngay
              </Button>
              <Button variant="heroOutline" size="xl">
                Tìm hiểu thêm
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card rounded-full border border-border hover:border-primary hover:shadow-soft transition-all duration-300"
              >
                <Facebook size={24} className="text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="https://www.tiktok.com/@chi_12321"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card rounded-full border border-border hover:border-primary hover:shadow-soft transition-all duration-300"
              >
                <Music2 size={24} className="text-muted-foreground hover:text-primary" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-8 mt-12"
            >
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-foreground">200+</p>
                <p className="text-sm text-muted-foreground">Học viên</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Hài lòng</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-foreground">3+</p>
                <p className="text-sm text-muted-foreground">Năm kinh nghiệm</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1.5s" }} />
              
              {/* Main image */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-strong">
                <img
                  src={profilePhoto}
                  alt="MeoHi - Giáo viên tiếng Trung"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -right-4 top-1/4 bg-card px-4 py-2 rounded-xl shadow-medium border border-border"
              >
                <p className="text-sm font-medium text-foreground">🎓 Du học sinh TQ</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -left-4 bottom-1/4 bg-card px-4 py-2 rounded-xl shadow-medium border border-border"
              >
                <p className="text-sm font-medium text-foreground">📚 Tiếng Trung Online</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
