import {
  HiOutlineCubeTransparent,
  HiOutlineUserGroup,
  HiOutlineLightBulb,
  HiOutlineBeaker,
  HiOutlineShieldCheck,
  HiOutlineClock,
} from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-red-50 dark:bg-surface-dark/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
            Why Parents Trust Us
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We combine cutting-edge technology with fundamental learning
            principles to create toys that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 text-primary flex items-center justify-center shrink-0">
              <HiOutlineCubeTransparent size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                AR + Phygital
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Bridging the gap between physical toys and digital interactivity
                for immersive play.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 text-accent-green flex items-center justify-center shrink-0">
              <HiOutlineUserGroup size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                Early Years Development
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Focusing on cognitive, motor, and social skills crucial for early growth.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="size-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-accent-purple flex items-center justify-center shrink-0">
              <HiOutlineLightBulb size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                Designed by Experts
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Created in collaboration with child psychologists and educators.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="size-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-secondary flex items-center justify-center shrink-0">
              <HiOutlineBeaker size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                STEM Based
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Building foundations in Science, Technology, Engineering, and Math.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center shrink-0">
              <HiOutlineShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                Parental Support
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Tools for parents to guide, monitor, and participate in the learning journey.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="size-12 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-500 flex items-center justify-center shrink-0">
              <HiOutlineClock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                Meaningful Screen Time
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Transforming passive consumption into active, educational engagement.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
