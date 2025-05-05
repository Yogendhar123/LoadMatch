import { useState, FormEvent } from 'react';
import { Calendar } from 'lucide-react';

interface LoadFormProps {
  onSubmit: (loadData: any) => void;
  onCancel: () => void;
}

const LoadForm = ({ onSubmit, onCancel }: LoadFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    origin: '',
    destination: '',
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    deadline: '',
    difficulty: 5, // Default middle value
    price: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.origin.trim()) newErrors.origin = 'Origin is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (formData.weight <= 0) newErrors.weight = 'Weight must be greater than 0';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    
    // Validate dimensions
    if (formData.dimensions.length <= 0) newErrors['dimensions.length'] = 'Length must be greater than 0';
    if (formData.dimensions.width <= 0) newErrors['dimensions.width'] = 'Width must be greater than 0';
    if (formData.dimensions.height <= 0) newErrors['dimensions.height'] = 'Height must be greater than 0';
    
    // Validate price
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested dimensions object
    if (name.startsWith('dimensions.')) {
      const dimensionKey = name.split('.')[1] as 'length' | 'width' | 'height';
      setFormData({
        ...formData,
        dimensions: {
          ...formData.dimensions,
          [dimensionKey]: parseFloat(value) || 0
        }
      });
    } else {
      // Handle other fields
      setFormData({
        ...formData,
        [name]: name === 'weight' || name === 'difficulty' || name === 'price' 
          ? parseFloat(value) || 0 
          : value
      });
    }
    
    // Clear error for this field when value changes
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Create a new load with default values for ID, status, etc.
      const newLoad = {
        ...formData,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Get min date (today) for the deadline input
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Load Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          } focus:border-blue-500 focus:ring-blue-500`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          } focus:border-blue-500 focus:ring-blue-500`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
            Origin Location*
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.origin ? 'border-red-300' : 'border-gray-300'
            } focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.origin && <p className="mt-1 text-sm text-red-600">{errors.origin}</p>}
        </div>
        
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
            Destination Location*
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.destination ? 'border-red-300' : 'border-gray-300'
            } focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.destination && <p className="mt-1 text-sm text-red-600">{errors.destination}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Weight (kg)*
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            min="0"
            step="0.1"
            value={formData.weight}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.weight ? 'border-red-300' : 'border-gray-300'
            } focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
        </div>
        
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline Date*
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <input
              type="date"
              id="deadline"
              name="deadline"
              min={getTodayDate()}
              value={formData.deadline}
              onChange={handleChange}
              className={`pl-10 block w-full rounded-md shadow-sm ${
                errors.deadline ? 'border-red-300' : 'border-gray-300'
              } focus:border-blue-500 focus:ring-blue-500`}
            />
          </div>
          {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dimensions (cm)*
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="dimensions.length" className="block text-xs text-gray-500">
              Length
            </label>
            <input
              type="number"
              id="dimensions.length"
              name="dimensions.length"
              min="0"
              step="0.1"
              value={formData.dimensions.length}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors['dimensions.length'] ? 'border-red-300' : 'border-gray-300'
              } focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors['dimensions.length'] && <p className="mt-1 text-xs text-red-600">{errors['dimensions.length']}</p>}
          </div>
          
          <div>
            <label htmlFor="dimensions.width" className="block text-xs text-gray-500">
              Width
            </label>
            <input
              type="number"
              id="dimensions.width"
              name="dimensions.width"
              min="0"
              step="0.1"
              value={formData.dimensions.width}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors['dimensions.width'] ? 'border-red-300' : 'border-gray-300'
              } focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors['dimensions.width'] && <p className="mt-1 text-xs text-red-600">{errors['dimensions.width']}</p>}
          </div>
          
          <div>
            <label htmlFor="dimensions.height" className="block text-xs text-gray-500">
              Height
            </label>
            <input
              type="number"
              id="dimensions.height"
              name="dimensions.height"
              min="0"
              step="0.1"
              value={formData.dimensions.height}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors['dimensions.height'] ? 'border-red-300' : 'border-gray-300'
              } focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors['dimensions.height'] && <p className="mt-1 text-xs text-red-600">{errors['dimensions.height']}</p>}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficulty Score (1-10)
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="range"
              id="difficulty"
              name="difficulty"
              min="1"
              max="10"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-3 w-8 text-gray-700 font-medium">{formData.difficulty}</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)*
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className={`pl-7 block w-full rounded-md shadow-sm ${
                errors.price ? 'border-red-300' : 'border-gray-300'
              } focus:border-blue-500 focus:ring-blue-500`}
            />
          </div>
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : 'Post Load'}
        </button>
      </div>
    </form>
  );
};

export default LoadForm;