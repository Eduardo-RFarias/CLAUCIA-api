import { Controller, Get, Post, Body, Res, Session, Query, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { WebService } from './web.service';
import { ProfessionalService } from '../professional/professional.service';
import { SessionData } from 'express-session';

@Controller()
export class WebController {
  constructor(
    private readonly webService: WebService,
    private readonly professionalService: ProfessionalService,
  ) {}

  @Get('/login')
  getLogin(@Session() session: SessionData, @Res() res: Response) {
    if (session.isAuthenticated) {
      return res.redirect('/dashboard');
    }
    return res.render('login', { title: 'Institution Login' });
  }

  @Post('/login')
  async postLogin(
    @Body() body: { name: string; password: string },
    @Session() session: SessionData,
    @Res() res: Response,
  ) {
    try {
      const isValid = await this.webService.validateInstitution(body.name, body.password);

      if (isValid) {
        session.institutionName = body.name;
        session.isAuthenticated = true;
        return res.redirect('/dashboard');
      } else {
        return res.render('login', {
          title: 'Institution Login',
          error: 'Invalid credentials',
          name: body.name,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.render('login', {
        title: 'Institution Login',
        error: 'Invalid credentials',
        name: body.name,
      });
    }
  }

  @Get('/dashboard')
  async getDashboard(
    @Session() session: SessionData,
    @Query('success') success: string,
    @Query('error') error: string,
    @Res() res: Response,
  ) {
    if (!session.isAuthenticated || !session.institutionName) {
      return res.redirect('/login');
    }

    const professionals = await this.professionalService.findByInstitution(session.institutionName);

    return res.render('dashboard', {
      title: 'Dashboard',
      institutionName: session.institutionName,
      professionals,
      success,
      error,
    });
  }

  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err: any) => {
      if (err) {
        console.error('Session destruction error:', err);
      }
      res.redirect('/login');
    });
  }

  @Get('/manage/professionals/new')
  getCreateProfessional(@Session() session: SessionData, @Res() res: Response) {
    if (!session.isAuthenticated) {
      return res.redirect('/login');
    }

    return res.render('create-professional', {
      title: 'Create New Professional',
      institutionName: session.institutionName,
    });
  }

  @Post('/manage/professionals')
  async createProfessional(
    @Body() body: { coren: string; name: string; password: string },
    @Session() session: SessionData,
    @Res() res: Response,
  ) {
    if (!session.isAuthenticated || !session.institutionName) {
      return res.redirect('/login');
    }

    try {
      await this.professionalService.create({
        ...body,
        institution_names: [session.institutionName],
      });

      return res.redirect('/dashboard?success=Professional created successfully');
    } catch (error: any) {
      return res.render('create-professional', {
        title: 'Create New Professional',
        institutionName: session.institutionName,
        error: error.message,
        formData: body,
      });
    }
  }

  @Post('/manage/professionals/:coren/delete')
  async deleteProfessional(@Body() body: any, @Session() session: SessionData, @Res() res: Response) {
    if (!session.isAuthenticated || !session.institutionName) {
      return res.redirect('/login');
    }

    const coren = body.coren;

    try {
      // Verify the professional belongs to this institution
      const professionals = await this.professionalService.findByInstitution(session.institutionName);
      const professional = professionals.find((p) => p.coren === coren);

      if (!professional) {
        return res.redirect('/dashboard?error=Professional not found or does not belong to your institution');
      }

      await this.professionalService.remove(coren);

      return res.redirect('/dashboard?success=Professional deleted successfully');
    } catch (error: any) {
      return res.redirect('/dashboard?error=' + encodeURIComponent(error.message));
    }
  }
}
