import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Registration {
  Timestamp: string;
  Name: string;
  Phone: string;
  Age?: string;
  [key: string]: string | undefined;
}

const RegistrationDashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] = useState("Name");

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/registrations`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      if (data.success) {
        setRegistrations(data.data);
        toast.success(`Loaded ${data.count} registrations`);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) =>
    String(reg[filterColumn] || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Export to CSV
  const exportToCSV = () => {
    if (registrations.length === 0) {
      toast.error("No data to export");
      return;
    }

    const columns = Object.keys(registrations[0] || {});
    const csvContent = [
      columns.join(","),
      ...registrations.map((reg) =>
        columns
          .map((col) => {
            const value = reg[col] || "";
            return `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `registrations-${new Date().getTime()}.csv`;
    link.click();

    toast.success("CSV exported successfully");
  };

  const columns = registrations.length > 0 ? Object.keys(registrations[0]) : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Registration Dashboard</h1>
          <p className="text-muted-foreground">Manage and view all registrations</p>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <select
                value={filterColumn}
                onChange={(e) => setFilterColumn(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>

              <Input
                placeholder={`Search by ${filterColumn}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 max-w-xs"
              />

              <Button
                onClick={fetchRegistrations}
                disabled={loading}
                variant="outline"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>

              <Button onClick={exportToCSV} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredRegistrations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Unique Phones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(registrations.map((r) => r.Phone)).size}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-mono">
                {registrations[0]?.Timestamp || "-"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registrations ({filteredRegistrations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredRegistrations.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No registrations found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      {columns.map((col) => (
                        <th
                          key={col}
                          className="text-left font-semibold p-2 whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((reg, idx) => (
                      <tr
                        key={idx}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        {columns.map((col) => (
                          <td
                            key={`${idx}-${col}`}
                            className="p-2 max-w-xs truncate"
                            title={String(reg[col] || "")}
                          >
                            {reg[col] || "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationDashboard;
