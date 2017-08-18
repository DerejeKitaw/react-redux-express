import mongoose, { Schema } from 'mongoose'

const BrandSchema = new Schema({
  article: {
    values: {
      buttonColor: { type: String, trim: true },
      buttonBackground: { type: String, trim: true },
      mediaElevation: { type: String, trim: true, default: 2 },
      h1Align: { type: String, trim: true, default: 'center' },
      h1Color: { type: String, minlength: 1, trim: true },
      h1TextShadow: { type: String, minlength: 1, trim: true },
      h2Align: { type: String, trim: true, default: 'center' },
      h2Color: { type: String, minlength: 1, trim: true },
      h2TextShadow: { type: String, minlength: 1, trim: true },
      h3Align: { type: String, trim: true, default: 'center' },
      h3Color: { type: String, minlength: 1, trim: true },
      h3TextShadow: { type: String, minlength: 1, trim: true },
    }
  },
  appBar: {
    image: {
      src: { type: String, minlength: 1, trim: true },
      width: { type: Number, trim: true, default: 128 },
      height: { type: Number, trim: true, default: 128 }
    },
    values: {
      backgroundColor: { type: String, minlength: 1, trim: true, default: 'rgb(0, 188, 212)' },
      color: { type: String, trim: true, default: 'rgb(255, 255, 255)' },
      fontFamily: { type: String, trim: true },
      fontSize: { type: String, trim: true },
      fontWeight: { type: String, trim: true },
      letterSpacing: { type: String, trim: true },
      name: { type: String, minlength: 1, trim: true, default: 'Brand' },
      navColor: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      textShadow: { type: String, trim: true },
    }
  },
  card: {
    values: {
      buttonColor: { type: String, trim: true },
      buttonBackground: { type: String, trim: true },
      elevation: { type: String, minlength: 1, trim: true, default: 1 },
      flex: { type: String, minlength: 1, trim: true, default: '1 1 auto' },
      h1Align: { type: String, trim: true, default: 'center' },
      h1Color: { type: String, minlength: 1, trim: true },
      h1TextShadow: { type: String, minlength: 1, trim: true },
      h2Align: { type: String, trim: true, default: 'center' },
      h2Color: { type: String, minlength: 1, trim: true },
      h2TextShadow: { type: String, minlength: 1, trim: true },
      h3Align: { type: String, trim: true, default: 'center' },
      h3Color: { type: String, minlength: 1, trim: true },
      h3TextShadow: { type: String, minlength: 1, trim: true },
    }
  },
  body: {
    values: {
      backgroundColor: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      color: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
    }
  },
  business: {
    values: {
      name: { type: String, minlength: 1, trim: true, default: 'Brand' },
      description: { type: String, minlength: 1, trim: true },
      phone: { type: String, minlength: 1, trim: true },
      email: { type: String, minlength: 1, trim: true },
      street: { type: String, minlength: 1, trim: true },
      city: { type: String, minlength: 1, trim: true },
      state: { type: String, minlength: 1, trim: true },
      zip: { type: String, minlength: 1, trim: true },
      facebook: { type: String, minlength: 1, trim: true },
      github: { type: String, minlength: 1, trim: true },
      google: { type: String, minlength: 1, trim: true },
      instagram: { type: String, minlength: 1, trim: true },
      linkedin: { type: String, minlength: 1, trim: true },
      twitter: { type: String, minlength: 1, trim: true },
      yelp: { type: String, minlength: 1, trim: true },
      youtube: { type: String, minlength: 1, trim: true },
    }
  },
  footer: {
    image: {
      src: { type: String, minlength: 1, trim: true },
      width: { type: Number, trim: true, default: 128 },
      height: { type: Number, trim: true, default: 128 }
    },
    values: {
      backgroundColor: { type: String, trim: true, default: 'rgb(0, 188, 212)' },
      color: { type: String, trim: true, default: '#ffffff' },
      borderTop: { type: String, trim: true },
      borderBottom: { type: String, trim: true },
      margin: { type: String, trim: true },
    }
  },
  hero: {
    values: {
      buttonColor: { type: String, trim: true },
      buttonBackground: { type: String, trim: true },
      h1Color: { type: String, minlength: 1, trim: true },
      h1TextShadow: { type: String, minlength: 1, trim: true },
      h2Color: { type: String, minlength: 1, trim: true },
      h2TextShadow: { type: String, minlength: 1, trim: true },
      h3Color: { type: String, minlength: 1, trim: true },
      h3TextShadow: { type: String, minlength: 1, trim: true },
    }
  },
  theme: {
    fontFamily: { type: String, minlength: 1, trim: true, default: 'Roboto, sans-serif' },
    palette: {
      primary1Color: { type: String, minlength: 1, trim: true, default: '#00BCD4' },
      primary2Color: { type: String, minlength: 1, trim: true, default: '#0097A7' },
      primary3Color: { type: String, minlength: 1, trim: true, default: '#BDBDBD' },
      accent1Color: { type: String, minlength: 1, trim: true, default: '#FF4081' },
      accent2Color: { type: String, minlength: 1, trim: true, default: '#F5F5F5' },
      accent3Color: { type: String, minlength: 1, trim: true, default: '#9E9E9E' },
      textColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
      secondaryTextColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 0.87)' },
      alternateTextColor: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      canvasColor: { type: String, minlength: 1, trim: true, default: '#ffffff' },
      borderColor: { type: String, minlength: 1, trim: true, default: '#E0E0E0' },
      disabledColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, .3)' },
      pickerHeaderColor: { type: String, minlength: 1, trim: true, default: '#00BCD4' },
      clockCircleColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, .7)' },
      shadowColor: { type: String, minlength: 1, trim: true, default: 'rgba(0, 0, 0, 1)' }
    }
  },
  typography: {
    values: {
      h1FontFamily: { type: String, minlength: 1, trim: true },
      h1FontSize: { type: String, minlength: 1, trim: true },
      h1FontWeight: { type: String, minlength: 1, trim: true },
      h1LetterSpacing: { type: String, minlength: 1, trim: true },
      h2Align: { type: String, trim: true, default: 'center' },
      h2Color: { type: String, minlength: 1, trim: true },
      h2FontFamily: { type: String, minlength: 1, trim: true },
      h2FontSize: { type: String, minlength: 1, trim: true },
      h2FontWeight: { type: String, minlength: 1, trim: true },
      h2LetterSpacing: { type: String, minlength: 1, trim: true },
      pAlign: { type: String, trim: true, default: 'center' },
      pColor: { type: String, minlength: 1, trim: true },
      pFontFamily: { type: String, minlength: 1, trim: true },
      pFontSize: { type: String, minlength: 1, trim: true },
      pFontWeight: { type: String, minlength: 1, trim: true },
      pLetterSpacing: { type: String, minlength: 1, trim: true },
    }
  },
}, {
  timestamps: true
})

BrandSchema.pre('remove', function(next) {
  const brand = this
  const { appBar, footer } = brand
  if (brand.image && brand.image.src) {
    deleteFile({ Key: brand.image.src }).catch(err => console.error(err))
  }
  if (footer.image && footer.image.src) {
    deleteFile({ Key: footer.image.src }).catch(err => console.error(err))
  }
  next()
})

const Brand = mongoose.model('Brand', BrandSchema)

export default Brand
