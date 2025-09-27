import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Download, Eye } from 'lucide-react';
import Link from 'next/link';

export default function DocumentsPage() {
  // Mock data - in real app, this would come from API
  const documents = [
    {
      id: 1,
      title: 'Employment Agreement - TechStart India',
      type: 'Employment Contract',
      status: 'Generated',
      createdAt: '2024-01-15',
      size: '2.3 MB',
      company: 'TechStart India',
      downloadCount: 3,
      lastModified: '2024-01-15'
    },
    {
      id: 2,
      title: 'NDA Template - Client Meeting',
      type: 'Non-Disclosure Agreement',
      status: 'Draft',
      createdAt: '2024-01-14',
      size: '1.8 MB',
      company: 'InnovateLabs',
      downloadCount: 1,
      lastModified: '2024-01-14'
    },
    {
      id: 3,
      title: 'Service Agreement - StartupHub',
      type: 'Service Contract',
      status: 'Generated',
      createdAt: '2024-01-13',
      size: '3.1 MB',
      company: 'StartupHub',
      downloadCount: 5,
      lastModified: '2024-01-13'
    },
    {
      id: 4,
      title: 'GST Registration Certificate',
      type: 'Compliance Document',
      status: 'Generated',
      createdAt: '2024-01-12',
      size: '1.2 MB',
      company: 'TechStart India',
      downloadCount: 2,
      lastModified: '2024-01-12'
    },
    {
      id: 5,
      title: 'Terms of Service - Mobile App',
      type: 'Legal Document',
      status: 'Under Review',
      createdAt: '2024-01-11',
      size: '2.8 MB',
      company: 'InnovateLabs',
      downloadCount: 0,
      lastModified: '2024-01-11'
    },
    {
      id: 6,
      title: 'Privacy Policy - Web Platform',
      type: 'Legal Document',
      status: 'Generated',
      createdAt: '2024-01-10',
      size: '1.5 MB',
      company: 'StartupHub',
      downloadCount: 4,
      lastModified: '2024-01-10'
    },
    {
      id: 7,
      title: 'Partnership Agreement - TechStart',
      type: 'Partnership Contract',
      status: 'Generated',
      createdAt: '2024-01-09',
      size: '4.2 MB',
      company: 'TechStart India',
      downloadCount: 2,
      lastModified: '2024-01-09'
    },
    {
      id: 8,
      title: 'Consulting Agreement - InnovateLabs',
      type: 'Consulting Contract',
      status: 'Draft',
      createdAt: '2024-01-08',
      size: '2.1 MB',
      company: 'InnovateLabs',
      downloadCount: 0,
      lastModified: '2024-01-08'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-gray-600">Manage your legal documents</p>
        </div>
        <Link href="/documents/generate">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Generate New Document
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    {doc.title}
                  </CardTitle>
                  <CardDescription>{doc.type}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Created: {doc.createdAt}</span>
                <span>Size: {doc.size}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  doc.status === 'Generated' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {doc.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
