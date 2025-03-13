import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

const IN_PRODUCTION = process.env.NODE_ENV === 'production'

const postcss = {
    plugins: [
        autoprefixer(),
        ...(IN_PRODUCTION ? [cssnano()] : []),
    ],
}

export default postcss
