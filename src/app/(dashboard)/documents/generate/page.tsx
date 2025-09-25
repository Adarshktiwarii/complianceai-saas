'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Eye } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  requiredFields: Record<string, any>;
  optionalFields?: Record<string, any>;
  price: number;
}

export default function DocumentGeneratorPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<any>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/documents/templates');
      const data = await response.json();
      if (data.success) {
        setTemplates(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const onSubmit = async (formData: any) => {
    if (!selectedTemplate) return;
    
    setGenerating(true);
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId: 'temp-company-id', // This should come from user context
          templateId: selectedTemplate.id,
          documentName: formData.documentName,
          userInputs: formData
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setGeneratedDoc(data.data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to generate document:', error);
    } finally {
      setGenerating(false);
    }
  };

  const downloadDocument = async () => {
    if (!generatedDoc) return;
    
    try {
      const response = await fetch(`/api/documents/${generatedDoc.id}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedDoc.documentName}.pdf`;
      a.click();
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="template">Select Template</Label>
              <Select
                onValueChange={(value) => {
                  const template = templates.find(t => t.id === value);
                  setSelectedTemplate(template || null);
                  reset();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a document template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex flex-col">
                        <span>{template.name}</span>
                        <span className="text-xs text-gray-500">₹{template.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedTemplate && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium">{selectedTemplate.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
                <p className="text-sm font-medium text-blue-600 mt-2">Price: ₹{selectedTemplate.price}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Document Form */}
      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="documentName">Document Name</Label>
                <Input
                  id="documentName"
                  {...register('documentName', { required: 'Document name is required' })}
                  placeholder="Enter document name"
                />
                {errors.documentName && (
                  <p className="text-sm text-red-600 mt-1">{errors.documentName.message}</p>
                )}
              </div>

              {/* Dynamic form fields based on template */}
              {Object.entries(selectedTemplate.requiredFields).map(([fieldKey, fieldConfig]: [string, any]) => (
                <div key={fieldKey}>
                  <Label htmlFor={fieldKey}>{fieldConfig.label}</Label>
                  {fieldConfig.type === 'textarea' ? (
                    <Textarea
                      id={fieldKey}
                      {...register(fieldKey, { 
                        required: fieldConfig.required ? `${fieldConfig.label} is required` : false 
                      })}
                      placeholder={fieldConfig.placeholder}
                    />
                  ) : fieldConfig.type === 'select' ? (
                    <Select {...register(fieldKey, { 
                      required: fieldConfig.required ? `${fieldConfig.label} is required` : false 
                    })}>
                      <SelectTrigger>
                        <SelectValue placeholder={fieldConfig.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldConfig.options.map((option: any) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={fieldKey}
                      type={fieldConfig.type || 'text'}
                      {...register(fieldKey, { 
                        required: fieldConfig.required ? `${fieldConfig.label} is required` : false 
                      })}
                      placeholder={fieldConfig.placeholder}
                    />
                  )}
                  {errors[fieldKey] && (
                    <p className="text-sm text-red-600 mt-1">{errors[fieldKey].message}</p>
                  )}
                </div>
              ))}

              <Button 
                type="submit" 
                disabled={generating}
                className="w-full"
              >
                {generating ? 'Generating...' : `Generate Document (₹${selectedTemplate.price})`}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Generated Document */}
      {generatedDoc && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Document</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" onClick={downloadDocument}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{generatedDoc.documentName}</h4>
              <p className="text-sm text-gray-600">
                Generated on {new Date(generatedDoc.generatedAt).toLocaleDateString())}
              </p>
              <div className="mt-4 max-h-60 overflow-y-auto text-sm">
                <pre className="whitespace-pre-wrap">{generatedDoc.content}</pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
