
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, X, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: number;
  fullName: string;
  fatherName: string;
  pmdcNumber: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  specialty: string;
  dateRegistered: string;
}

const Doctors = () => {
  const [filter, setFilter] = useState('All');
  const { toast } = useToast();
  
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      fullName: 'Dr. Sarah Wilson',
      fatherName: 'Robert Wilson',
      pmdcNumber: 'PMC-12345',
      status: 'Pending',
      specialty: 'Cardiology',
      dateRegistered: '2025-01-15'
    },
    {
      id: 2,
      fullName: 'Dr. Michael Chen',
      fatherName: 'David Chen',
      pmdcNumber: 'PMC-23456',
      status: 'Verified',
      specialty: 'Neurology',
      dateRegistered: '2025-01-10'
    },
    {
      id: 3,
      fullName: 'Dr. Emma Johnson',
      fatherName: 'William Johnson',
      pmdcNumber: 'PMC-34567',
      status: 'Pending',
      specialty: 'Dermatology',
      dateRegistered: '2025-01-20'
    },
    {
      id: 4,
      fullName: 'Dr. Ahmed Ali',
      fatherName: 'Hassan Ali',
      pmdcNumber: 'PMC-45678',
      status: 'Rejected',
      specialty: 'Orthopedics',
      dateRegistered: '2025-01-05'
    }
  ]);

  const filteredDoctors = filter === 'All' 
    ? doctors 
    : doctors.filter(doctor => doctor.status === filter);

  const handleStatusChange = (doctorId: number, newStatus: 'Verified' | 'Rejected') => {
    setDoctors(prev => 
      prev.map(doctor => 
        doctor.id === doctorId 
          ? { ...doctor, status: newStatus }
          : doctor
      )
    );
    
    toast({
      title: `Doctor ${newStatus}`,
      description: `Doctor has been ${newStatus.toLowerCase()} successfully.`,
      variant: newStatus === 'Verified' ? 'default' : 'destructive',
    });
  };

  const handlePmdcCheck = (pmdcNumber: string) => {
    const url = `https://www.pmdc.org.pk/SearchDoctor/Verification?searchType=RegistrationNo&searchValue=${pmdcNumber}`;
    window.open(url, '_blank');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Pending: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      Verified: 'bg-green-100 text-green-800 hover:bg-green-200',
      Rejected: 'bg-red-100 text-red-800 hover:bg-red-200'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctors Management</h1>
          <p className="text-gray-600 mt-2">Manage doctor registrations and verifications</p>
        </div>
        
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Doctors</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Verified">Verified</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-gray-800">
            Doctors List ({filteredDoctors.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Father Name</TableHead>
                <TableHead>PMDC Number</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{doctor.fullName}</TableCell>
                  <TableCell>{doctor.fatherName}</TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {doctor.pmdcNumber}
                    </code>
                  </TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{getStatusBadge(doctor.status)}</TableCell>
                  <TableCell>{new Date(doctor.dateRegistered).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {doctor.status === 'Pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleStatusChange(doctor.id, 'Verified')}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(doctor.id, 'Rejected')}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePmdcCheck(doctor.pmdcNumber)}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        PMDC Check
                      </Button>
                    </div>
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

export default Doctors;
