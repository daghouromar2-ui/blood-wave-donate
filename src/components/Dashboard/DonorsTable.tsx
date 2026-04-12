import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { differenceInDays, format } from "date-fns";
import { ar } from "date-fns/locale";
import { Phone, MessageCircle, Eye, Trash2, ChevronUp, ChevronDown, Download } from "lucide-react";
import { toast } from "sonner";
import type { Donor } from "@/lib/constants";
import { BLOOD_TYPE_COLORS, ELIGIBILITY_DAYS } from "@/lib/constants";
import { useDeleteDonor } from "@/hooks/useDonors";
import DonorDetailsModal from "./DonorDetailsModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DonorsTableProps {
  donors: Donor[];
}

const DonorsTable = ({ donors }: DonorsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Donor | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const deleteMutation = useDeleteDonor();

  const today = new Date();

  const getEligibility = (donor: Donor) => {
    if (!donor.is_active) return { eligible: false, days: 0, label: "غير نشط" };
    if (!donor.last_donation_date) return { eligible: true, days: 0, label: "مؤهل (لم يتبرع)" };
    const days = differenceInDays(today, new Date(donor.last_donation_date));
    if (days >= ELIGIBILITY_DAYS) return { eligible: true, days: 0, label: "مؤهل ✅" };
    return { eligible: false, days: ELIGIBILITY_DAYS - days, label: `غير مؤهل - ${ELIGIBILITY_DAYS - days} يوم` };
  };

  const columns = useMemo<ColumnDef<Donor>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="accent-red-500"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="accent-red-500"
          />
        ),
        size: 40,
      },
      {
        accessorKey: "full_name",
        header: "الاسم",
        cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
      },
      {
        accessorKey: "blood_type",
        header: "الفصيلة",
        cell: ({ getValue }) => {
          const type = getValue<string>();
          const colors = BLOOD_TYPE_COLORS[type] || { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/50" };
          return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${colors.bg} ${colors.text} ${colors.border}`}>
              {type}
            </span>
          );
        },
      },
      {
        accessorKey: "phone_whatsapp",
        header: "الهاتف",
        cell: ({ getValue }) => <span className="text-white/70 text-sm">{getValue<string>()}</span>,
      },
      {
        id: "location",
        header: "الموقع",
        accessorFn: (row) => [row.municipality, row.wilaya].filter(Boolean).join("، "),
        cell: ({ getValue }) => <span className="text-white/60 text-sm">{getValue<string>() || "—"}</span>,
      },
      {
        accessorKey: "last_donation_date",
        header: "آخر تبرع",
        cell: ({ getValue }) => {
          const val = getValue<string | null>();
          return (
            <span className="text-white/60 text-sm">
              {val ? format(new Date(val), "dd/MM/yyyy", { locale: ar }) : "—"}
            </span>
          );
        },
      },
      {
        id: "eligibility",
        header: "الأهلية",
        accessorFn: (row) => getEligibility(row),
        cell: ({ row }) => {
          const e = getEligibility(row.original);
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${e.eligible ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
              {e.label}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const d = row.original;
          const phone = d.phone_whatsapp.replace(/[^0-9]/g, "");
          return (
            <div className="flex items-center gap-1">
              <a href={`tel:${d.phone_whatsapp}`} className="p-1.5 rounded-lg hover:bg-blue-500/20 text-blue-400" title="اتصال">
                <Phone className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-emerald-500/20 text-emerald-400" title="واتساب">
                <MessageCircle className="w-4 h-4" />
              </a>
              <button onClick={() => { setSelectedDonor(d); setDetailsOpen(true); }} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60" title="عرض">
                <Eye className="w-4 h-4" />
              </button>
              <button onClick={() => setDeleteTarget(d)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400" title="حذف">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: donors,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 20 } },
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success("تم حذف المتبرع بنجاح");
    } catch {
      toast.error("حدث خطأ أثناء الحذف");
    }
    setDeleteTarget(null);
  };

  const exportCSV = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const dataToExport = selectedRows.length > 0 ? selectedRows.map((r) => r.original) : donors;
    const BOM = "\uFEFF";
    const headers = ["الاسم", "الفصيلة", "الهاتف", "الولاية", "البلدية", "آخر تبرع", "الحالة"];
    const rows = dataToExport.map((d) => [
      d.full_name,
      d.blood_type,
      d.phone_whatsapp,
      d.wilaya || "",
      d.municipality || "",
      d.last_donation_date || "",
      getEligibility(d).label,
    ]);
    const csv = BOM + [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donors_${format(today, "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تصدير الملف بنجاح");
  };

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
      {/* Bulk actions bar */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between px-4 py-2 bg-red-500/10 border-b border-white/10">
          <span className="text-sm text-white/70">{selectedCount} محدد</span>
          <button onClick={exportCSV} className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            <Download className="w-4 h-4" /> تصدير CSV
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-right" dir="rtl">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-white/10">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    className="px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider cursor-pointer select-none hover:text-white/80"
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" && <ChevronUp className="w-3 h-3" />}
                      {header.column.getIsSorted() === "desc" && <ChevronDown className="w-3 h-3" />}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
        <div className="flex items-center gap-1 text-sm text-white/50">
          <span>إجمالي: {donors.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded-lg bg-white/10 text-white/70 text-sm disabled:opacity-30 hover:bg-white/20"
          >
            السابق
          </button>
          <span className="text-sm text-white/50">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded-lg bg-white/10 text-white/70 text-sm disabled:opacity-30 hover:bg-white/20"
          >
            التالي
          </button>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-1 text-sm text-white/50 hover:text-white/80">
          <Download className="w-4 h-4" /> تصدير
        </button>
      </div>

      {/* Modals */}
      <DonorDetailsModal donor={selectedDonor} open={detailsOpen} onClose={() => setDetailsOpen(false)} />

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="bg-gray-900 border-white/10 text-white" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              هل أنت متأكد من حذف المتبرع "{deleteTarget?.full_name}"؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2">
            <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20">إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DonorsTable;
