using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.DependencyInjection;
using Refit;
using TibiaInfo.Web.Interfaces.TibiaDataApi;

namespace TibiaInfo.Web
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            const string BASE_URL = "https://api.tibiadata.com/v2";
            services.AddRefitClient<ICharacterService>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(BASE_URL));

            services.AddRefitClient<IGuildService>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(BASE_URL));

            services.AddRefitClient<IHighScoresService>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(BASE_URL));

            services.AddRefitClient<INewsService>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(BASE_URL));

            services.AddRefitClient<IHouseService>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(BASE_URL));

            services.AddRefitClient<IWorldService>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(BASE_URL));

            services.AddAutoMapper();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                
                if (env.IsDevelopment())
                {
                    // https://docs.microsoft.com/es-es/aspnet/core/client-side/spa/angular?tabs=visual-studio&view=aspnetcore-2.1#run-ng-serve-independently
                    //pass the url after npm start
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                    // spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
