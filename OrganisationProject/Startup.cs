using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using Service.Interfaces;
using Repository.Repositories;
using Common.Models;
using Microsoft.OpenApi.Models;
using Service.Services;

namespace WebAPI
{
    public class Startup
    {
        // Constructor to inject configuration or other services if needed
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Configure DbContext with SQL Server
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Register application services
            services.AddScoped<ILoginDetailsRepository, LoginDetailsRepository>();
            services.AddScoped<ILoginDetailsService, LoginDetailsService>();
            services.AddScoped<IApplicationMenuRepository, ApplicationMenuRepository>();
            services.AddScoped<IApplicationMenuService, ApplicationMenuService>();
            services.AddScoped<ILookupRepository, LookupRepository>();
            services.AddScoped<ILookupService, LookupService>();
            services.AddScoped<IOrganizationRepository, OrganizationRepository>();
            services.AddScoped<IOrganizationService, OrganizationService>();

            // Configure AutoMapper
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddLogging();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();

                    });
            });
            services.AddControllers();

            // Configure Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI V1");
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("AllowAll");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
