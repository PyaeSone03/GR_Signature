import { SurveyData } from '@/types/survey';

export const sampleSurvey: SurveyData = {
  id: 'customer-feedback-2024',
  title: 'Customer Feedback Survey',
  description: 'Help us improve our products and services by providing your valuable feedback.',
  questions: [
    {
      id: 'name',
      type: 'text',
      title: 'Your Name',
      description: 'Please tell us your name',
      required: true,
      placeholder: 'Enter your full name'
    },
    {
      id: 'age',
      type: 'radio',
      title: 'Age Range',
      description: 'Please select your age range',
      required: true,
      options: [
        { id: 'age-18-20', label: '18-20', value: '18-20' },
        { id: 'age-21-30', label: '21-30', value: '21-30' },
        { id: 'age-31-40', label: '31-40', value: '31-40' },
        { id: 'age-41-50', label: '41-50', value: '41-50' },
        { id: 'age-51-plus', label: '51+', value: '51+' }
      ]
    },
    {
      id: 'gender',
      type: 'radio',
      title: 'Gender',
      description: 'Please select your gender',
      required: true,
      options: [
        { id: 'gender-male', label: 'Male', value: 'male' },
        { id: 'gender-female', label: 'Female', value: 'female' },
        { id: 'gender-other', label: 'Other', value: 'other' },
        { id: 'gender-prefer-not', label: 'Prefer not to say', value: 'prefer-not' }
      ]
    },
    {
      id: 'phone',
      type: 'text',
      title: 'Phone Number',
      description: 'Please provide your phone number',
      required: true,
      placeholder: 'e.g., 09XXXXXXXXX'
    },
    {
      id: 'location',
      type: 'select',
      title: 'Location (Township)',
      description: 'Please select your township',
      required: true,
      options: [
        { id: 'ahlone', label: 'Ahlone Township', value: 'ahlone' },
        { id: 'bahan', label: 'Bahan Township', value: 'bahan' },
        { id: 'botataung', label: 'Botataung Township', value: 'botataung' },
        { id: 'dagon', label: 'Dagon Township', value: 'dagon' },
        { id: 'dalah', label: 'Dalah Township', value: 'dalah' },
        { id: 'dawbon', label: 'Dawbon Township', value: 'dawbon' },
        { id: 'hlaing', label: 'Hlaing Township', value: 'hlaing' },
        { id: 'hlaingthaya', label: 'Hlaingthaya Township', value: 'hlaingthaya' },
        { id: 'insein', label: 'Insein Township', value: 'insein' },
        { id: 'kamarut', label: 'Kamarut Township', value: 'kamarut' },
        { id: 'kyimyindaing', label: 'Kyimyindaing Township', value: 'kyimyindaing' },
        { id: 'lanmadaw', label: 'Lanmadaw Township', value: 'lanmadaw' },
        { id: 'latha', label: 'Latha Township', value: 'latha' },
        { id: 'mayangone', label: 'Mayangone Township', value: 'mayangone' },
        { id: 'mingaladon', label: 'Mingaladon Township', value: 'mingaladon' },
        { id: 'mintaik', label: 'Mintaik Township', value: 'mintaik' },
        { id: 'north-okkala', label: 'North Okkala Township', value: 'north-okkala' },
        { id: 'pabedan', label: 'Pabedan Township', value: 'pabedan' },
        { id: 'sanchaung', label: 'Sanchaung Township', value: 'sanchaung' },
        { id: 'seikkan', label: 'Seikkan Township', value: 'seikkan' },
        { id: 'south-okkala', label: 'South Okkala Township', value: 'south-okkala' },
        { id: 'tamwe', label: 'Tamwe Township', value: 'tamwe' },
        { id: 'thingangyun', label: 'Thingangyun Township', value: 'thingangyun' },
        { id: 'yankin', label: 'Yankin Township', value: 'yankin' },
        { id: 'other', label: 'Other Township', value: 'other' }
      ]
    }
  ]
};