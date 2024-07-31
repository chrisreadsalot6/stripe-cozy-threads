import Image from 'next/image';

// Show the welcome image on the main site page
export default function WelcomeImage() {
    return (
        <div className='mx-auto max-w-2xl px-4 pt-4 pb-4 sm:px-6 sm:pt-7 sm:pb-6 lg:max-w-7xl lg:px-8'>
            <div className='relative overflow-hidden rounded-lg h-[50vh]'>
                {/* Welcome Image */}
                <Image
                    src='/welcome-image.jpeg'
                    alt='Welcome Image'
                    className='w-full object-cover object-center rounded-lg'
                    fill
                    sizes='100vw'
                    priority
                />
                {/* Welcome Image Overly Text */}
                <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col items-start justify-center px-8 sm:px-16'>
                    <h1 className='text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight'>
                        Discover Our Latest Collection
                    </h1>
                    <p className='text-lg sm:text-xl text-white/90 max-w-md'>
                        Every purchase is sustainably sourced with a complimentary carbon offset.
                    </p>
                    {/* Call to Action Button */}
                    <a
                        href='#apparel'
                        className='mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition duration-300 inline-block'>
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    );
}
