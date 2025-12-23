const Testimonials = () => {
  return (
    <section className="py-16 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Happy Parents &amp; Kids
        </h3>
      </div>

      <div className="relative w-full">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar px-4 sm:px-0 justify-start sm:justify-center">

          {/* Review 1 */}
          <div className="min-w-[300px] max-w-[300px] bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-1 text-yellow-400 mb-3">
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 italic">
              "My son loves the globe! He's learned so many countries and animals.
              It's screen time I actually feel good about."
            </p>

            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB12HTWKXVzaPhDGjT0IuclGVPmP8dXYiSisVnoUvQJDND1WZRyvH83H2dLGLRcDSudtMHGzJGhs88raKJUickAvgso4bpldKYMEiv9z3uYi3PvU0CseZBM2faS92AD0q_o-2O2tWKB8n_QkJ6OllKr8hFrbu4IV2jvd9UeVbzVC3RTbPGTb5DrADlVevJSvvTgUkyMlaWdGonslCB7QlqYoBSgknVu_X6m2Dn-iY5Fb14_qvIIZpu7a1qnLLEfOhKhs3DR93A0vES1"
                  alt="Sarah T. avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                  Sarah T.
                </h5>
                <p className="text-xs text-slate-400">Mom of 6yo</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="min-w-[300px] max-w-[300px] bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-1 text-yellow-400 mb-3">
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 italic">
              "The coding kit is fantastic. It breaks down complex concepts
              into really fun games. Highly recommend!"
            </p>

            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApkger0LSL7CHABXdIfS3NCnlNKTC5RiaehFJyC5t-r9wd9UeczfW_CwpQOQT8N1vrlST0GXpjHZcxOxEXCkTVETfX1niYLZKaeXnMnY13fB3QjrrjokVXG8PPJh__n1oHbP5AWq7HUky50EqJeShW-DewkfmSSmB4VTAnWPySvDqF3H4GQS0YTt6LOkb9zFOk3wV_jo4xAoBssqVCCLJ59_umIhgPloryUjZ0BiNNP2fQjIlY7RDla-3hvFs_D6NgZp_zmd3fulHo"
                  alt="Mike R. avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                  Mike R.
                </h5>
                <p className="text-xs text-slate-400">Dad of 9yo</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="min-w-[300px] max-w-[300px] bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-1 text-yellow-400 mb-3">
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star</span>
              <span className="material-symbols-outlined text-sm fill-current">star_half</span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 italic">
              "Finally, toys that keep them engaged for more than 10 minutes.
              The AR integration works flawlessly."
            </p>

            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcfx6Lhut-3ktN23lqAkFL4DT03nKXCvqMo6f1LERL5qVIQd34wkW36Du3fYcMGJUtf6uvr4XdVvFJAoZebaQOchQa5cL8bmg3zz3DvnKirB0ulxcrbJ9w24jdj_JqsNc0oXO4YxYl1QjbhoKiRg3rrU1mZnZbcP66k12UX1uwgKQxQ9FMkBCFnFlekPecdJ_dj9PFq2ywXvPMK8rPkQSoA2EFPoW93V9zGLzZrj-EvIyvDk46-_RVHUg_aIml7awLr7l8CNcNpEUd"
                  alt="Emily K. avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                  Emily K.
                </h5>
                <p className="text-xs text-slate-400">
                  Mom of 4yo &amp; 7yo
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
