"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "الخدمات", href: "#services" },
  { label: "الأطباء", href: "#doctors" },
  { label: "احجز موعد", href: "#booking" },
  { label: "تواصل معنا", href: "#contact" },
];

const services = [
  { icon: "🩺", title: "الباطنة", text: "تشخيص ومتابعة الأمراض الباطنية المزمنة والحادة بدقة عالية." },
  { icon: "👶", title: "طب الأطفال", text: "رعاية شاملة لصحة طفلك من الولادة حتى سن المراهقة." },
  { icon: "🦷", title: "طب الأسنان", text: "علاج وتجميل الأسنان بأحدث التقنيات وبدون ألم." },
  { icon: "❤️", title: "القلب", text: "فحوصات القلب وتخطيط الإيكو مع متابعة دورية للحالات." },
  { icon: "🔬", title: "التحاليل الطبية", text: "معمل مجهز بالكامل بنتائج دقيقة وسريعة." },
  { icon: "🩻", title: "الأشعة", text: "أشعة رقمية وسونار بأجهزة حديثة وتقارير واضحة." },
];

const doctors = [
  { name: "د. أحمد سمير", specialty: "استشاري الباطنة والجهاز الهضمي", exp: "خبرة 15 سنة", emoji: "👨‍⚕️" },
  { name: "د. سارة محمود", specialty: "أخصائية طب الأطفال وحديثي الولادة", exp: "خبرة 10 سنوات", emoji: "👩‍⚕️" },
  { name: "د. محمد عادل", specialty: "استشاري طب وجراحة الأسنان", exp: "خبرة 12 سنة", emoji: "👨‍⚕️" },
];

// دالة بترجع تاريخ النهارده بصيغة yyyy-mm-dd
function getToday() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [today, setToday] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", doctor: "", date: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [bookings, setBookings] = useState([]);

  // تحميل الحجوزات المحفوظة وتحديد تاريخ اليوم عند فتح الصفحة
  useEffect(() => {
    setToday(getToday());
    try {
      const saved = localStorage.getItem("smartcare-bookings");
      if (saved) setBookings(JSON.parse(saved));
    } catch (error) {
      console.log("تعذر قراءة الحجوزات المحفوظة");
    }
  }, []);

  function saveBookings(list) {
    setBookings(list);
    try {
      localStorage.setItem("smartcare-bookings", JSON.stringify(list));
    } catch (error) {
      console.log("تعذر حفظ الحجوزات");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function validate() {
    const newErrors = {};

    if (form.name.trim().length < 3) {
      newErrors.name = "من فضلك اكتب الاسم كاملًا (3 أحرف على الأقل)";
    }

    // رقم موبايل مصري: 11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015
    if (!/^01[0125][0-9]{8}$/.test(form.phone.trim())) {
      newErrors.phone = "اكتب رقم موبايل صحيح مكوّن من 11 رقم (مثال: 01012345678)";
    }

    if (!form.doctor) {
      newErrors.doctor = "من فضلك اختر الطبيب";
    }

    if (!form.date) {
      newErrors.date = "من فضلك اختر تاريخ الحجز";
    } else if (form.date < today) {
      newErrors.date = "لا يمكن الحجز في تاريخ قديم";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(null);
      return;
    }

    const newBooking = {
      id: Date.now(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      doctor: form.doctor,
      date: form.date,
    };

    saveBookings([newBooking, ...bookings]);
    setSuccess(newBooking);
    setForm({ name: "", phone: "", doctor: "", date: "" });
    setErrors({});
  }

  function deleteBooking(id) {
    saveBookings(bookings.filter((b) => b.id !== id));
  }

  return (
    <>
      {/* ========== شريط التنقل ========== */}
      <header className="navbar">
        <div className="container nav-inner">
          <a href="#home" className="logo">
            <span className="logo-icon">✚</span>
            <span>
              Smart Care <small>Clinic</small>
            </span>
          </a>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="فتح القائمة"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      <main>
        {/* ========== الواجهة الرئيسية ========== */}
        <section id="home" className="hero">
          <div className="container hero-inner">
            <div className="hero-text">
              <span className="badge">🏥 عيادة طبية متكاملة</span>
              <h1>
                Smart Care <span className="gradient-text">Clinic</span>
              </h1>
              <p>
                نقدم لك رعاية صحية حديثة بأيدي نخبة من الأطباء المتخصصين وأحدث الأجهزة
                الطبية، لأن صحتك وصحة أسرتك هي أولويتنا.
              </p>
              <div className="hero-buttons">
                <a href="#booking" className="btn btn-primary">
                  احجز موعد الآن
                </a>
                <a href="#services" className="btn btn-outline">
                  تعرف على خدماتنا
                </a>
              </div>
              <div className="stats">
                <div>
                  <strong>+10</strong>
                  <span>سنوات خبرة</span>
                </div>
                <div>
                  <strong>+5000</strong>
                  <span>مريض سعيد</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>أطباء استشاريين</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <div className="pulse-icon">💙</div>
                <h3>رعاية تثق بها</h3>
                <ul>
                  <li>✔ كشف سريع بدون انتظار طويل</li>
                  <li>✔ أجهزة حديثة ونتائج دقيقة</li>
                  <li>✔ أطباء بخبرات عالية</li>
                </ul>
              </div>
              <div className="floating-chip chip-1">🩺 فحص شامل</div>
              <div className="floating-chip chip-2">⭐ تقييم 4.9</div>
            </div>
          </div>
        </section>

        {/* ========== الخدمات ========== */}
        <section id="services" className="section">
          <div className="container">
            <div className="section-head">
              <span className="section-tag">خدماتنا</span>
              <h2>خدمات طبية متكاملة</h2>
              <p>نقدم مجموعة واسعة من الخدمات الطبية تحت سقف واحد لراحتك.</p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <div key={service.title} className="card service-card">
                  <div className="icon-circle">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== الأطباء ========== */}
        <section id="doctors" className="section section-light">
          <div className="container">
            <div className="section-head">
              <span className="section-tag">فريقنا الطبي</span>
              <h2>أطباؤنا المتميزون</h2>
              <p>نخبة من الاستشاريين والأخصائيين لرعايتك على أعلى مستوى.</p>
            </div>

            <div className="doctors-grid">
              {doctors.map((doctor) => (
                <div key={doctor.name} className="card doctor-card">
                  <div className="doctor-avatar">{doctor.emoji}</div>
                  <h3>{doctor.name}</h3>
                  <p className="specialty">{doctor.specialty}</p>
                  <span className="exp">{doctor.exp}</span>
                  <a href="#booking" className="btn btn-small">
                    احجز مع الطبيب
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== نموذج الحجز ========== */}
        <section id="booking" className="section">
          <div className="container booking-wrap">
            <div className="booking-info">
              <span className="section-tag">حجز موعد</span>
              <h2>احجز موعدك في دقيقة واحدة</h2>
              <p>
                املأ البيانات وسنقوم بتأكيد موعدك في أقرب وقت. الحجز سهل وسريع وبدون أي
                تعقيدات.
              </p>
              <ul className="booking-points">
                <li>📅 اختر اليوم المناسب لك</li>
                <li>👨‍⚕️ اختر الطبيب الذي تفضله</li>
                <li>📞 سنتواصل معك للتأكيد</li>
              </ul>
            </div>

            <div className="booking-form-box">
              {success && (
                <div className="success-msg" role="status">
                  <button className="close-btn" onClick={() => setSuccess(null)} aria-label="إغلاق">
                    ✕
                  </button>
                  <strong>✅ تم حجز موعدك بنجاح!</strong>
                  <p>
                    شكرًا يا {success.name}، تم تسجيل حجزك مع {success.doctor} بتاريخ{" "}
                    {success.date}. سنتواصل معك على رقم {success.phone} للتأكيد.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">اسم المريض</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="اكتب اسمك الكامل"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? "input-error" : ""}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">رقم الهاتف</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="01012345678"
                    value={form.phone}
                    onChange={handleChange}
                    className={errors.phone ? "input-error" : ""}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="doctor">الطبيب</label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={form.doctor}
                    onChange={handleChange}
                    className={errors.doctor ? "input-error" : ""}
                  >
                    <option value="">اختر الطبيب</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.name} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                  {errors.doctor && <span className="error-text">{errors.doctor}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="date">تاريخ الحجز</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={handleChange}
                    className={errors.date ? "input-error" : ""}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  تأكيد الحجز
                </button>
              </form>

              {bookings.length > 0 && (
                <div className="bookings-list">
                  <h4>حجوزاتك المحفوظة (تجريبي)</h4>
                  {bookings.map((b) => (
                    <div key={b.id} className="booking-item">
                      <div>
                        <strong>{b.name}</strong>
                        <span>
                          {b.doctor} • {b.date}
                        </span>
                      </div>
                      <button onClick={() => deleteBooking(b.id)} aria-label="حذف الحجز">
                        🗑
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========== التواصل ========== */}
        <section id="contact" className="section section-light">
          <div className="container">
            <div className="section-head">
              <span className="section-tag">تواصل معنا</span>
              <h2>يسعدنا خدمتك دائمًا</h2>
              <p>تواصل معنا في أي وقت أو قم بزيارتنا في العيادة.</p>
            </div>

            <div className="contact-grid">
              <div className="card contact-card">
                <div className="icon-circle">📞</div>
                <h3>رقم الهاتف</h3>
                <p dir="ltr">0100 123 4567</p>
                <p dir="ltr">02 2345 6789</p>
              </div>
              <div className="card contact-card">
                <div className="icon-circle">📍</div>
                <h3>العنوان</h3>
                <p>12 شارع التحرير، الدقي</p>
                <p>القاهرة، مصر</p>
              </div>
              <div className="card contact-card">
                <div className="icon-circle">🕒</div>
                <h3>مواعيد العمل</h3>
                <p>السبت - الخميس: 9 ص - 10 م</p>
                <p>الجمعة: 4 م - 10 م</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========== الفوتر ========== */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Smart Care Clinic — جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </>
  );
}