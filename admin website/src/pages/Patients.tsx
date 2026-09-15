
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Eye, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  email: string;
  dateRegistered: string;
  lastVisit: string;
  status: 'Active' | 'Inactive';
}

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const patients: Patient[] = [
    {
      id: 1,
      name: 'John Doe',
      age: 35,
      gender: 'Male',
      email: 'john.doe@email.com',
      dateRegistered: '2025-01-10',
      lastVisit: '2025-01-20',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 28,
      gender: 'Female',
      email: 'jane.smith@email.com',
      dateRegistered: '2025-01-08',
      lastVisit: '2025-01-18',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      age: 42,
      gender: 'Male',
      email: 'mike.johnson@email.com',
      dateRegistered: '2024-12-15',
      lastVisit: '2024-12-20',
      status: 'Inactive'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      age: 31,
      gender: 'Female',
      email: 'sarah.wilson@email.com',
      dateRegistered: '2025-01-12',
      lastVisit: '2025-01-22',
      status: 'Active'
    },
    {
      id: 5,
      name: 'David Brown',
      age: 55,
      gender: 'Male',
      email: 'david.brown@email.com',
      dateRegistered: '2025-01-05',
      lastVisit: '2025-01-15',
      status: 'Active'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (patientId: number) => {
    toast({
      title: "Patient Profile",
      description: `Viewing profile for Patient ID: ${patientId}`,
    });
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        className={
          status === 'Active' 
            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients Management</h1>
          <p className="text-gray-600 mt-2">View all registered patients</p>
        </div>
        
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{patients.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-600">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Patients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {patients.filter(p => p.status === 'Active').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-600">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {patients.filter(p => new Date(p.dateRegistered).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-600">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-gray-800">
            Patients List ({filteredPatients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date Registered</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      patient.gender === 'Male' ? 'text-blue-600' : 'text-pink-600'
                    }>
                      {patient.gender}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{new Date(patient.dateRegistered).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewProfile(patient.id)}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
