import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useDonors } from "@/hooks/useDonors";
import { LogOut, Droplets } from "lucide-react";
import { differenceInDays, differenceInYears } from "date-fns";
import FloatingBackground from "@/components/BloodDonation/FloatingBackground";
import StatsCards from "@/components/Dashboard/StatsCards";
import DonorsFilters, { type FiltersState } from "@/components/Dashboard/DonorsFilters";
import DonorsTable from "@/components/Dashboard/DonorsTable";
import BloodTypeChart from "@/components/Dashboard/BloodTypeChart";
import EmergencyModal from "@/components/Dashboard/EmergencyModal";
import { ELIGIBILITY_DAYS } from "@/lib/constants";

const defaultFilters: FiltersState = {
  search: "",
  bloodType: "",
  wilaya: "",
  eligibility: "",
  ageMin: 18,
  ageMax: 65,
};

const Dashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { data: donors = [], isLoading } = useDonors();
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);

  const filteredDonors = useMemo(() => {
    const today = new Date();
    return donors.filter((d) => {
      // Search
      if (filters.search) {
        const s = filters.search.toLowerCase();
        if (!d.full_name.toLowerCase().includes(s) && !d.phone_whatsapp.includes(s)) return false;
      }
      // Blood type
      if (filters.bloodType && d.blood_type !== filters.bloodType) return false;
      // Wilaya
      if (filters.wilaya && d.wilaya !== filters.wilaya) return false;
      // Eligibility
      if (filters.eligibility) {
        const daysAgo = d.last_donation_date ? differenceInDays(today, new Date(d.last_donation_date)) : null;
        if (filters.eligibility === "eligible" && daysAgo !== null && daysAgo < ELIGIBILITY_DAYS) return false;
        if (filters.eligibility === "not_eligible" && (daysAgo === null || daysAgo >= ELIGIBILITY_DAYS)) return false;
        if (filters.eligibility === "never" && d.last_donation_date) return false;
      }
      // Age
      if (d.date_of_birth) {
        const age = differenceInYears(today, new Date(d.date_of_birth));
        if (age < filters.ageMin || age > filters.ageMax) return false;
      }
      return true;
    });
  }, [donors, filters]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative" dir="rtl">
      <FloatingBackground />

      <div className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">لوحة إدارة التبرع بالدم</h1>
              <p className="text-sm text-white/50">القرارة</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <EmergencyModal donors={donors} />
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
              title="تسجيل الخروج"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <StatsCards donors={donors} />

        {/* Filters */}
        <DonorsFilters filters={filters} onChange={setFilters} onReset={() => setFilters(defaultFilters)} />

        {/* Chart + Table Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <BloodTypeChart donors={donors} />
          </div>
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-white/20 border-t-red-500 rounded-full animate-spin" />
              </div>
            ) : (
              <DonorsTable donors={filteredDonors} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
