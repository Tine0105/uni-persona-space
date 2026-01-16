import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, GraduationCap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const REGISTRATION_ENDPOINT = `${API_BASE_URL}/api/registrations`;

// Memoized constant arrays - prevent recreation on render
const COURSES = [
  "HSK 1 - Sơ cấp 1",
  "HSK 2 - Sơ cấp 2",
  "HSK 3 - Trung cấp 1",
  "HSK 4 - Trung cấp 2",
  "HSK 5 - Cao cấp 1",
  "HSK 6 - Cao cấp 2",
  "Giao tiếp cơ bản",
  "Luyện thi HSKK",
];

const PURPOSE_OPTIONS = [
  { id: "travel", label: "Giao tiếp cơ bản (đi du lịch, mua bán)" },
  { id: "work", label: "Phục vụ công việc (đàm phán, làm việc với đối tác)" },
  { id: "exam", label: "Ôn thi chứng chỉ HSK-HSKK" },
  { id: "study", label: "Phục vụ học tập, nghiên cứu" },
  { id: "culture", label: "Yêu thích văn hóa, phim ảnh, âm nhạc Trung Quốc" },
];

const SKILL_OPTIONS = [
  { id: "speaking", label: "Nghe - Nói (phản xạ giao tiếp)" },
  { id: "writing", label: "Đọc - Viết (chữ Hán)" },
  { id: "grammar", label: "Ngữ pháp (để thi cử)" },
  { id: "all", label: "Tổng hợp và cân bằng tất cả" },
];

const LEARNING_FORMAT_OPTIONS = [
  { id: "1on1", label: "Học 1 kèm 1 (hiệu quả cao, linh hoạt thời gian)" },
  { id: "group", label: "Học nhóm nhỏ (2-5 bạn, tương tác tốt, tiết kiệm chi phí)" },
  { id: "online", label: "Học lớp online qua Zoom/Meet" },
  { id: "offline", label: "Học trực tiếp" },
];

const SESSIONS_OPTIONS = [
  { id: "2", label: "2 buổi/tuần" },
  { id: "3", label: "3 buổi/tuần" },
  { id: "more", label: "> 3 buổi/tuần" },
  { id: "flexible", label: "Linh hoạt theo lịch cá nhân" },
];

const SOURCE_OPTIONS = [
  { id: "facebook", label: "Facebook" },
  { id: "tiktok", label: "TikTok/YouTube" },
  { id: "friend", label: "Giới thiệu từ bạn bè/học viên cũ" },
  { id: "google", label: "Tìm kiếm Google" },
];

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
}

interface FormData {
  // Part 1: Personal Info
  name: string;
  phone: string;
  age: string;
  socialLink: string;
  
  // Part 2: Learning Info
  currentLevel: string;
  specificLevel: string;
  purposes: string[];
  otherPurpose: string;
  skills: string[];
  goals: string;
  
  // Part 3: Class Preferences
  learningFormats: string[];
  sessionsPerWeek: string;
  
  // Part 4: Open Questions
  previousExperience: string;
  source: string;
  otherSource: string;
  additionalQuestions: string;
  
  // Course
  course: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preselectedCourse = "",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    age: "",
    socialLink: "",
    currentLevel: "",
    specificLevel: "",
    purposes: [],
    otherPurpose: "",
    skills: [],
    goals: "",
    learningFormats: [],
    sessionsPerWeek: "",
    previousExperience: "",
    source: "",
    otherSource: "",
    additionalQuestions: "",
    course: preselectedCourse || "",
  });

  // TODO: Replace with your actual Google Form URL after creating it
  // Format: https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
  const GOOGLE_FORM_URL: string = "";
  
  // TODO: Map these to your Google Form entry IDs
  // Find entry IDs by inspecting your Google Form's HTML
  const FORM_FIELDS: Record<string, string> = {
    name: "entry.XXXXXXXXXX",
    phone: "entry.XXXXXXXXXX",
    age: "entry.XXXXXXXXXX",
    socialLink: "entry.XXXXXXXXXX",
    currentLevel: "entry.XXXXXXXXXX",
    specificLevel: "entry.XXXXXXXXXX",
    purposes: "entry.XXXXXXXXXX",
    skills: "entry.XXXXXXXXXX",
    goals: "entry.XXXXXXXXXX",
    learningFormats: "entry.XXXXXXXXXX",
    sessionsPerWeek: "entry.XXXXXXXXXX",
    previousExperience: "entry.XXXXXXXXXX",
    source: "entry.XXXXXXXXXX",
    additionalQuestions: "entry.XXXXXXXXXX",
    course: "entry.XXXXXXXXXX",
  };

  useEffect(() => {
    if (preselectedCourse) {
      setFormData((prev) => ({ ...prev, course: preselectedCourse }));
    }
  }, [preselectedCourse]);

  // Memoized callback to prevent unnecessary re-renders
  const handleChange = useCallback((field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Memoized callback for checkbox changes
  const handleCheckboxChange = useCallback((field: 'purposes' | 'skills' | 'learningFormats', value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.phone || !formData.age || !formData.socialLink) {
          toast.error("Vui lòng điền đầy đủ thông tin cá nhân!");
          return false;
        }
        return true;
      case 2:
        if (!formData.currentLevel || formData.purposes.length === 0 || formData.skills.length === 0) {
          toast.error("Vui lòng điền đầy đủ thông tin học tập!");
          return false;
        }
        return true;
      case 3:
        if (formData.learningFormats.length === 0 || !formData.sessionsPerWeek) {
          toast.error("Vui lòng chọn hình thức học và số buổi!");
          return false;
        }
        return true;
      default:
        return true;
    }
  }, [formData]);

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Prepare data to send to backend
      const dataToSend = {
        ...formData,
        // Ensure email field exists (use phone as fallback for now)
        email: formData.phone,
      };

      // Send to backend API
      const response = await fetch(REGISTRATION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        toast.success("Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm.");

        setTimeout(() => {
          setIsSuccess(false);
          setCurrentStep(1);
          setFormData({
            name: "",
            phone: "",
            age: "",
            socialLink: "",
            currentLevel: "",
            specificLevel: "",
            purposes: [],
            otherPurpose: "",
            skills: [],
            goals: "",
            learningFormats: [],
            sessionsPerWeek: "",
            previousExperience: "",
            source: "",
            otherSource: "",
            additionalQuestions: "",
            course: "",
          });
          onClose();
        }, 2000);
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, currentStep, validateStep, onClose]);

  const renderStepIndicator = useMemo(() => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              step === currentStep
                ? "bg-primary text-primary-foreground"
                : step < currentStep
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step}
          </div>
          {step < 4 && (
            <div
              className={`w-8 h-0.5 ${
                step < currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  ), [currentStep]);

  const renderStep1 = useMemo(() => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Phần 1: Thông Tin Cá Nhân
      </h3>
      
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
          Số điện thoại liên hệ <span className="text-destructive">*</span>
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
        <Label htmlFor="age">
          Tuổi (hoặc năm sinh) <span className="text-destructive">*</span>
        </Label>
        <Input
          id="age"
          placeholder="Ví dụ: 25 hoặc 1999"
          value={formData.age}
          onChange={(e) => handleChange("age", e.target.value)}
          required
          maxLength={10}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="socialLink">
          Link Facebook/Zalo <span className="text-destructive">*</span>
        </Label>
        <Input
          id="socialLink"
          placeholder="https://facebook.com/..."
          value={formData.socialLink}
          onChange={(e) => handleChange("socialLink", e.target.value)}
          required
          maxLength={255}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="course">Khóa học quan tâm</Label>
        <Select
          value={formData.course}
          onValueChange={(value) => handleChange("course", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn khóa học" />
          </SelectTrigger>
          <SelectContent>
            {COURSES.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ), [formData.name, formData.phone, formData.age, formData.socialLink, formData.course, handleChange]);

  const renderStep2 = useMemo(() => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Phần 2: Thông Tin Học Tập & Mục Tiêu
      </h3>
      
      <div className="space-y-3">
        <Label>
          Trình độ tiếng Trung hiện tại <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={formData.currentLevel}
          onValueChange={(value) => handleChange("currentLevel", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="zero" id="level-zero" />
            <Label htmlFor="level-zero" className="font-normal cursor-pointer">
              Chưa biết gì/Bắt đầu từ con số 0
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specific" id="level-specific" />
            <Label htmlFor="level-specific" className="font-normal cursor-pointer">
              Đã có trình độ cụ thể
            </Label>
          </div>
        </RadioGroup>
        {formData.currentLevel === "specific" && (
          <Input
            placeholder="Nhập trình độ cụ thể (VD: HSK 2, giao tiếp cơ bản...)"
            value={formData.specificLevel}
            onChange={(e) => handleChange("specificLevel", e.target.value)}
            className="mt-2"
          />
        )}
      </div>

      <div className="space-y-3">
        <Label>
          Mục đích học tiếng Trung <span className="text-destructive">*</span>
          <span className="text-muted-foreground text-sm ml-1">(Có thể chọn nhiều)</span>
        </Label>
        <div className="space-y-2">
          {PURPOSE_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`purpose-${option.id}`}
                checked={formData.purposes.includes(option.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("purposes", option.id, checked as boolean)
                }
              />
              <Label htmlFor={`purpose-${option.id}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="purpose-other"
              checked={formData.purposes.includes("other")}
              onCheckedChange={(checked) =>
                handleCheckboxChange("purposes", "other", checked as boolean)
              }
            />
            <Label htmlFor="purpose-other" className="font-normal cursor-pointer">
              Khác
            </Label>
          </div>
          {formData.purposes.includes("other") && (
            <Input
              placeholder="Nhập mục đích khác..."
              value={formData.otherPurpose}
              onChange={(e) => handleChange("otherPurpose", e.target.value)}
              className="ml-6"
            />
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label>
          Kỹ năng muốn cải thiện nhất <span className="text-destructive">*</span>
        </Label>
        <div className="space-y-2">
          {SKILL_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`skill-${option.id}`}
                checked={formData.skills.includes(option.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("skills", option.id, checked as boolean)
                }
              />
              <Label htmlFor={`skill-${option.id}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goals">
          Mục tiêu cụ thể trong 3-6 tháng tới
        </Label>
        <Textarea
          id="goals"
          placeholder="VD: Giao tiếp được 10 chủ đề cơ bản, thi đậu HSK 3, đọc được menu nhà hàng..."
          value={formData.goals}
          onChange={(e) => handleChange("goals", e.target.value)}
          rows={3}
          maxLength={500}
        />
      </div>
    </div>
  ), [formData.currentLevel, formData.specificLevel, formData.purposes, formData.otherPurpose, formData.skills, formData.goals, handleChange, handleCheckboxChange]);

  const renderStep3 = useMemo(() => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Phần 3: Thông Tin Lớp Học Mong Muốn
      </h3>
      
      <div className="space-y-3">
        <Label>
          Hình thức học quan tâm <span className="text-destructive">*</span>
          <span className="text-muted-foreground text-sm ml-1">(Có thể chọn nhiều)</span>
        </Label>
        <div className="space-y-2">
          {LEARNING_FORMAT_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`format-${option.id}`}
                checked={formData.learningFormats.includes(option.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("learningFormats", option.id, checked as boolean)
                }
              />
              <Label htmlFor={`format-${option.id}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>
          Số buổi học mong muốn/tuần <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={formData.sessionsPerWeek}
          onValueChange={(value) => handleChange("sessionsPerWeek", value)}
        >
          {SESSIONS_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={`sessions-${option.id}`} />
              <Label htmlFor={`sessions-${option.id}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  ), [formData.learningFormats, formData.sessionsPerWeek, handleChange, handleCheckboxChange]);

  const renderStep4 = useMemo(() => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Phần 4: Câu Hỏi Mở & Tìm Hiểu Thêm
      </h3>
      
      <div className="space-y-2">
        <Label htmlFor="previousExperience">
          Bạn đã từng học tiếng Trung chưa? Nếu rồi, đâu là khó khăn lớn nhất?
        </Label>
        <Textarea
          id="previousExperience"
          placeholder="Chia sẻ kinh nghiệm và khó khăn của bạn..."
          value={formData.previousExperience}
          onChange={(e) => handleChange("previousExperience", e.target.value)}
          rows={3}
          maxLength={500}
        />
      </div>

      <div className="space-y-3">
        <Label>Bạn biết đến tôi/website qua đâu?</Label>
        <RadioGroup
          value={formData.source}
          onValueChange={(value) => handleChange("source", value)}
        >
          {SOURCE_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={`source-${option.id}`} />
              <Label htmlFor={`source-${option.id}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="source-other" />
            <Label htmlFor="source-other" className="font-normal cursor-pointer">
              Khác
            </Label>
          </div>
        </RadioGroup>
        {formData.source === "other" && (
          <Input
            placeholder="Nguồn khác..."
            value={formData.otherSource}
            onChange={(e) => handleChange("otherSource", e.target.value)}
            className="ml-6"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalQuestions">
          Bạn có mong muốn hay câu hỏi nào khác?
        </Label>
        <Textarea
          id="additionalQuestions"
          placeholder="Để lại câu hỏi hoặc mong muốn của bạn tại đây..."
          value={formData.additionalQuestions}
          onChange={(e) => handleChange("additionalQuestions", e.target.value)}
          rows={3}
          maxLength={500}
        />
      </div>
    </div>
  ), [formData.previousExperience, formData.source, formData.otherSource, formData.additionalQuestions, handleChange]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.15 }}
            className="bg-card border border-border rounded-2xl shadow-strong w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Đăng ký tư vấn khóa học
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Điền thông tin để được tư vấn phù hợp nhất
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                      className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4"
                    >
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Đăng ký thành công!
                    </h3>
                    <p className="text-muted-foreground text-center">
                      Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất!
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {renderStepIndicator}
                    
                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.15 }}
                        >
                          {currentStep === 1 && renderStep1}
                          {currentStep === 2 && renderStep2}
                          {currentStep === 3 && renderStep3}
                          {currentStep === 4 && renderStep4}
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Buttons */}
                      <div className="flex justify-between mt-6 pt-4 border-t border-border">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          disabled={currentStep === 1}
                          className={currentStep === 1 ? "invisible" : ""}
                        >
                          Quay lại
                        </Button>
                        
                        {currentStep < totalSteps ? (
                          <Button type="button" onClick={nextStep}>
                            Tiếp tục
                          </Button>
                        ) : (
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Đang gửi...
                              </>
                            ) : (
                              "Gửi đăng ký"
                            )}
                          </Button>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
