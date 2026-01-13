import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
}

const courses = [
  { value: "hsk1-2", label: "HSK 1-2 Cơ bản" },
  { value: "hsk3-4", label: "HSK 3-4 Trung cấp" },
  { value: "hsk5-6", label: "HSK 5-6 Nâng cao" },
];

const RegistrationModal = ({ isOpen, onClose, preselectedCourse }: RegistrationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: preselectedCourse || "",
    note: "",
  });

  // TODO: Replace with your actual Google Form URL after creating it
  // Format: https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
  const GOOGLE_FORM_URL: string = "";
  
  // TODO: Map these to your Google Form entry IDs
  // Find entry IDs by inspecting your Google Form's HTML
  const FORM_FIELDS: Record<string, string> = {
    name: "entry.XXXXXXXXXX",
    phone: "entry.XXXXXXXXXX",
    email: "entry.XXXXXXXXXX",
    course: "entry.XXXXXXXXXX",
    note: "entry.XXXXXXXXXX",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.course) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    setIsSubmitting(true);

    try {
      // If Google Form URL is configured, submit to Google Form
      if (GOOGLE_FORM_URL && !GOOGLE_FORM_URL.includes("YOUR_FORM_ID")) {
        const formBody = new URLSearchParams();
        formBody.append(FORM_FIELDS.name, formData.name);
        formBody.append(FORM_FIELDS.phone, formData.phone);
        formBody.append(FORM_FIELDS.email, formData.email);
        formBody.append(FORM_FIELDS.course, formData.course);
        formBody.append(FORM_FIELDS.note, formData.note);

        await fetch(GOOGLE_FORM_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
        });
      }

      // Show success state
      setIsSuccess(true);
      toast.success("Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm.");

      // Reset after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", phone: "", email: "", course: "", note: "" });
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-display font-bold text-primary-foreground">
                  Đăng ký khóa học
                </h2>
                <button
                  onClick={onClose}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Đăng ký thành công!
                    </h3>
                    <p className="text-muted-foreground text-center">
                      Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Họ và tên <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Nhập họ và tên"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        maxLength={100}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Số điện thoại/Zalo <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Nhập số điện thoại"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                        maxLength={15}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Nhập email (không bắt buộc)"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        maxLength={255}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="course">
                        Khóa học <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.course}
                        onValueChange={(value) => handleChange("course", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn khóa học" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.value} value={course.value}>
                              {course.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="note">Ghi chú</Label>
                      <Textarea
                        id="note"
                        placeholder="Thời gian học mong muốn, câu hỏi khác..."
                        value={formData.note}
                        onChange={(e) => handleChange("note", e.target.value)}
                        rows={3}
                        maxLength={500}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Gửi đăng ký
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Bằng việc đăng ký, bạn đồng ý với{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => {
                          // Could open rules modal here
                        }}
                      >
                        quy định lớp học
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
