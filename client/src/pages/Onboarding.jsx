"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Onboarding = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5
  const [errors, setErrors] = useState({})

  const [userProfile, setUserProfile] = useState({
    age: "",
    occupation: "",
    householdSize: "",
    pets: "",


    monthlyIncome: "",
    rentBudget: "",
    utilitiesBudget: "",

    workSchedule: "",
    socialLevel: "",
    noisePreference: "",
    outdoorActivities: [],

   
    proximityToWork: "",
    publicTransportAccess: "",
    walkabilityImportance: "",
    neighborhoodType: "",

    mustHaveAmenities: [],
    dealBreakers: [],
    moveInTimeline: "",
  })

  const updateUserProfile = async (profile) => {
    console.log("Saving user profile:", profile)
    return Promise.resolve()
  }

  const validateCurrentStep = () => {
    const newErrors = {}

    switch (currentStep) {
      case 1:
        if (!userProfile.age) newErrors.age = "Age is required"
        if (!userProfile.occupation) newErrors.occupation = "Occupation is required"
        if (!userProfile.householdSize) newErrors.householdSize = "Household size is required"
        if (!userProfile.pets) newErrors.pets = "Pet information is required"
        break
      case 2:
        if (!userProfile.monthlyIncome) newErrors.monthlyIncome = "Monthly income is required"
        if (!userProfile.rentBudget) newErrors.rentBudget = "Rent budget is required"
        if (!userProfile.utilitiesBudget) newErrors.utilitiesBudget = "Utilities budget is required"
        break
      case 3:
        if (!userProfile.workSchedule) newErrors.workSchedule = "Work schedule is required"
        if (!userProfile.socialLevel) newErrors.socialLevel = "Social preference is required"
        if (!userProfile.noisePreference) newErrors.noisePreference = "Noise preference is required"
        break
      case 4:
        if (!userProfile.proximityToWork) newErrors.proximityToWork = "Work proximity is required"
        if (!userProfile.publicTransportAccess) newErrors.publicTransportAccess = "Transport preference is required"
        if (!userProfile.walkabilityImportance) newErrors.walkabilityImportance = "Walkability preference is required"
        if (!userProfile.neighborhoodType) newErrors.neighborhoodType = "Neighborhood type is required"
        break
      case 5:
        if (userProfile.mustHaveAmenities.length === 0)
          newErrors.mustHaveAmenities = "Select at least one must-have amenity"
        if (userProfile.dealBreakers.length === 0) newErrors.dealBreakers = "Select at least one deal breaker"
        if (!userProfile.moveInTimeline) newErrors.moveInTimeline = "Move-in timeline is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleMultiSelect = (field, option) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: prev[field].includes(option) ? prev[field].filter((item) => item !== option) : [...prev[field], option],
    }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const nextStep = async () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1)
      } else {
        try {
          await updateUserProfile(userProfile);
localStorage.setItem("userPreferences", JSON.stringify(userProfile)); 
navigate("/Explore");

        } catch (error) {
          console.error("Failed to save profile:", error)
        }
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const CustomInput = ({ label, type = "text", value, onChange, error, placeholder, required = true }) => (
    <div className="mb-6">
      <label className="block text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
          error
            ? "border-red-400 bg-red-50 focus:border-red-500"
            : "border-gray-200 focus:border-blue-400 focus:bg-blue-50"
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  )

  const CustomSelect = ({ label, value, onChange, options, error, placeholder, required = true }) => (
    <div className="mb-6">
      <label className="block text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 appearance-none bg-white ${
          error
            ? "border-red-400 bg-red-50 focus:border-red-500"
            : "border-gray-200 focus:border-blue-400 focus:bg-blue-50"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  )

  const MultiSelectCard = ({ options, selectedOptions, onToggle, error }) => (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => onToggle(option.value)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedOptions.includes(option.value)
                ? "border-blue-400 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOptions.includes(option.value) ? "border-blue-500 bg-blue-500" : "border-gray-300"
                }`}
              >
                {selectedOptions.includes(option.value) && <span className="text-white text-xs">✓</span>}
              </div>
              <div>
                <span className="text-2xl mr-2">{option.icon}</span>
                <span className="font-medium text-gray-800">{option.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-2 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  )

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-gray-600">
          STEP {currentStep} OF {totalSteps}
        </span>
        <span className="text-sm font-bold text-blue-600">
          {Math.round((currentStep / totalSteps) * 100)}% COMPLETE
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )

  // Step Components
  const StepOne = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">👤</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Tell Us About Yourself</h2>
        <p className="text-gray-600 text-lg">Help us understand your personal situation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomInput
          label="Your Age"
          type="number"
          value={userProfile.age}
          onChange={(value) => handleInputChange("age", value)}
          error={errors.age}
          placeholder="e.g., 28"
        />

        <CustomSelect
          label="Occupation"
          value={userProfile.occupation}
          onChange={(value) => handleInputChange("occupation", value)}
          error={errors.occupation}
          placeholder="Select your occupation"
          options={[
            { value: "student", label: "Student" },
            { value: "tech", label: "Technology" },
            { value: "healthcare", label: "Healthcare" },
            { value: "education", label: "Education" },
            { value: "finance", label: "Finance" },
            { value: "retail", label: "Retail" },
            { value: "freelance", label: "Freelancer" },
            { value: "other", label: "Other" },
          ]}
        />

        <CustomSelect
          label="Household Size"
          value={userProfile.householdSize}
          onChange={(value) => handleInputChange("householdSize", value)}
          error={errors.householdSize}
          placeholder="How many people?"
          options={[
            { value: "1", label: "Just me (1 person)" },
            { value: "2", label: "2 people" },
            { value: "3", label: "3 people" },
            { value: "4", label: "4 people" },
            { value: "5+", label: "5+ people" },
          ]}
        />

        <CustomSelect
          label="Pet Situation"
          value={userProfile.pets}
          onChange={(value) => handleInputChange("pets", value)}
          error={errors.pets}
          placeholder="Do you have pets?"
          options={[
            { value: "none", label: "No pets" },
            { value: "dog", label: "Dog(s)" },
            { value: "cat", label: "Cat(s)" },
            { value: "both", label: "Both dogs and cats" },
            { value: "other", label: "Other pets" },
          ]}
        />
      </div>
    </div>
  )

  const StepTwo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">💰</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Financial Information</h2>
        <p className="text-gray-600 text-lg">Let's understand your budget and financial capacity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomInput
          label="Monthly Income"
          type="number"
          value={userProfile.monthlyIncome}
          onChange={(value) => handleInputChange("monthlyIncome", value)}
          error={errors.monthlyIncome}
          placeholder="e.g., 5000"
        />

        <CustomInput
          label="Rent Budget"
          type="number"
          value={userProfile.rentBudget}
          onChange={(value) => handleInputChange("rentBudget", value)}
          error={errors.rentBudget}
          placeholder="e.g., 1800"
        />

        <CustomInput
          label="Utilities Budget"
          type="number"
          value={userProfile.utilitiesBudget}
          onChange={(value) => handleInputChange("utilitiesBudget", value)}
          error={errors.utilitiesBudget}
          placeholder="e.g., 200"
        />

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Budget Tip</h4>
          <p className="text-blue-700 text-sm">
            Experts recommend spending no more than 30% of your income on rent. Based on your income, that would be:{" "}
            <strong>${Math.round(userProfile.monthlyIncome * 0.3)}</strong>
          </p>
        </div>
      </div>
    </div>
  )

  const StepThree = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎯</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Lifestyle Preferences</h2>
        <p className="text-gray-600 text-lg">How do you like to live and spend your time?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomSelect
          label="Work Schedule"
          value={userProfile.workSchedule}
          onChange={(value) => handleInputChange("workSchedule", value)}
          error={errors.workSchedule}
          placeholder="What's your work schedule?"
          options={[
            { value: "9to5", label: "Traditional 9-5" },
            { value: "flexible", label: "Flexible hours" },
            { value: "remote", label: "Work from home" },
            { value: "shift", label: "Shift work" },
            { value: "weekend", label: "Weekend work" },
          ]}
        />

        <CustomSelect
          label="Social Level"
          value={userProfile.socialLevel}
          onChange={(value) => handleInputChange("socialLevel", value)}
          error={errors.socialLevel}
          placeholder="How social are you?"
          options={[
            { value: "introvert", label: "Prefer quiet, private spaces" },
            { value: "moderate", label: "Balanced social life" },
            { value: "extrovert", label: "Love community events" },
          ]}
        />

        <CustomSelect
          label="Noise Preference"
          value={userProfile.noisePreference}
          onChange={(value) => handleInputChange("noisePreference", value)}
          error={errors.noisePreference}
          placeholder="How do you feel about noise?"
          options={[
            { value: "quiet", label: "Need quiet environment" },
            { value: "moderate", label: "Some noise is okay" },
            { value: "lively", label: "Enjoy bustling areas" },
          ]}
        />
      </div>

      <div>
        <label className="block text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wide">
          Outdoor Activities You Enjoy
        </label>
        <MultiSelectCard
          options={[
            { value: "running", label: "Running/Jogging", icon: "🏃" },
            { value: "cycling", label: "Cycling", icon: "🚴" },
            { value: "hiking", label: "Hiking", icon: "🥾" },
            { value: "sports", label: "Sports", icon: "⚽" },
            { value: "walking", label: "Walking", icon: "🚶" },
            { value: "gardening", label: "Gardening", icon: "🌱" },
          ]}
          selectedOptions={userProfile.outdoorActivities}
          onToggle={(option) => handleMultiSelect("outdoorActivities", option)}
        />
      </div>
    </div>
  )

  const StepFour = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📍</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Location Requirements</h2>
        <p className="text-gray-600 text-lg">What matters most about your neighborhood's location?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomSelect
          label="Proximity to Work"
          value={userProfile.proximityToWork}
          onChange={(value) => handleInputChange("proximityToWork", value)}
          error={errors.proximityToWork}
          placeholder="How close to work?"
          options={[
            { value: "walking", label: "Walking distance (< 1 mile)" },
            { value: "short", label: "Short commute (< 30 min)" },
            { value: "moderate", label: "Moderate commute (30-60 min)" },
            { value: "long", label: "Long commute okay (> 60 min)" },
            { value: "remote", label: "Work remotely" },
          ]}
        />

        <CustomSelect
          label="Public Transport Access"
          value={userProfile.publicTransportAccess}
          onChange={(value) => handleInputChange("publicTransportAccess", value)}
          error={errors.publicTransportAccess}
          placeholder="How important is public transport?"
          options={[
            { value: "essential", label: "Essential - must have" },
            { value: "important", label: "Important - prefer to have" },
            { value: "nice", label: "Nice to have" },
            { value: "unnecessary", label: "Not needed - have car" },
          ]}
        />

        <CustomSelect
          label="Walkability Importance"
          value={userProfile.walkabilityImportance}
          onChange={(value) => handleInputChange("walkabilityImportance", value)}
          error={errors.walkabilityImportance}
          placeholder="How important is walkability?"
          options={[
            { value: "critical", label: "Critical - walk everywhere" },
            { value: "high", label: "High - walk to most places" },
            { value: "medium", label: "Medium - some walking" },
            { value: "low", label: "Low - mostly drive" },
          ]}
        />

        <CustomSelect
          label="Neighborhood Type"
          value={userProfile.neighborhoodType}
          onChange={(value) => handleInputChange("neighborhoodType", value)}
          error={errors.neighborhoodType}
          placeholder="What type of neighborhood?"
          options={[
            { value: "urban", label: "Urban - city center" },
            { value: "suburban", label: "Suburban - residential" },
            { value: "mixed", label: "Mixed - urban/suburban" },
            { value: "rural", label: "Rural - countryside" },
          ]}
        />
      </div>
    </div>
  )

  const StepFive = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Final Preferences</h2>
        <p className="text-gray-600 text-lg">What are your must-haves and deal-breakers?</p>
      </div>

      <div>
        <label className="block text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wide">
          Must-Have Amenities <span className="text-red-500">*</span>
        </label>
        <MultiSelectCard
          options={[
            { value: "parking", label: "Parking Space", icon: "🚗" },
            { value: "laundry", label: "In-unit Laundry", icon: "🧺" },
            { value: "gym", label: "Gym/Fitness Center", icon: "🏋️" },
            { value: "pool", label: "Swimming Pool", icon: "🏊" },
            { value: "balcony", label: "Balcony/Patio", icon: "🌿" },
            { value: "storage", label: "Storage Space", icon: "📦" },
            { value: "dishwasher", label: "Dishwasher", icon: "🍽️" },
            { value: "ac", label: "Air Conditioning", icon: "❄️" },
          ]}
          selectedOptions={userProfile.mustHaveAmenities}
          onToggle={(option) => handleMultiSelect("mustHaveAmenities", option)}
          error={errors.mustHaveAmenities}
        />
      </div>

      <div>
        <label className="block text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wide">
          Deal Breakers <span className="text-red-500">*</span>
        </label>
        <MultiSelectCard
          options={[
            { value: "noParking", label: "No Parking", icon: "🚫" },
            { value: "noLaundry", label: "No Laundry", icon: "🚫" },
            { value: "groundFloor", label: "Ground Floor", icon: "🏠" },
            { value: "topFloor", label: "Top Floor", icon: "🏢" },
            { value: "noPets", label: "No Pets Allowed", icon: "🐕" },
            { value: "smoking", label: "Smoking Allowed", icon: "🚬" },
            { value: "noElevator", label: "No Elevator", icon: "🚫" },
            { value: "sharedBath", label: "Shared Bathroom", icon: "🚿" },
          ]}
          selectedOptions={userProfile.dealBreakers}
          onToggle={(option) => handleMultiSelect("dealBreakers", option)}
          error={errors.dealBreakers}
        />
      </div>

      <CustomSelect
        label="Move-in Timeline"
        value={userProfile.moveInTimeline}
        onChange={(value) => handleInputChange("moveInTimeline", value)}
        error={errors.moveInTimeline}
        placeholder="When do you want to move?"
        options={[
          { value: "asap", label: "ASAP - within 2 weeks" },
          { value: "month", label: "Within a month" },
          { value: "twoMonths", label: "Within 2 months" },
          { value: "threeMonths", label: "Within 3 months" },
          { value: "flexible", label: "Flexible timeline" },
        ]}
      />

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <h3 className="font-bold text-lg mb-4 text-gray-800">🎉 Profile Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div>
              <strong>Age:</strong> {userProfile.age || "Not set"}
            </div>
            <div>
              <strong>Occupation:</strong> {userProfile.occupation || "Not set"}
            </div>
            <div>
              <strong>Household:</strong> {userProfile.householdSize || "Not set"} people
            </div>
            <div>
              <strong>Budget:</strong> ${userProfile.rentBudget || "Not set"}/month
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <strong>Work Schedule:</strong> {userProfile.workSchedule || "Not set"}
            </div>
            <div>
              <strong>Neighborhood:</strong> {userProfile.neighborhoodType || "Not set"}
            </div>
            <div>
              <strong>Must-haves:</strong> {userProfile.mustHaveAmenities.length} selected
            </div>
            <div>
              <strong>Deal-breakers:</strong> {userProfile.dealBreakers.length} selected
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />
      case 2:
        return <StepTwo />
      case 3:
        return <StepThree />
      case 4:
        return <StepFour />
      case 5:
        return <StepFive />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🏠</span>
            </div>
            <span className="text-2xl font-bold">NeighborMatch</span>
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Dream Neighborhood
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Answer a few questions and we'll match you with neighborhoods that fit your lifestyle perfectly
          </p>
        </div>

        <ProgressBar />

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 mb-8">
          <div className="p-8 md:p-12">{renderCurrentStep()}</div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span>←</span>
            Previous
          </button>

          <div className="flex gap-3">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i + 1 === currentStep ? "bg-blue-600 scale-125" : i + 1 < currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            {currentStep === totalSteps ? "Find My Neighborhoods" : "Next Step"}
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
