import { PartialType } from '@nestjs/mapped-types';
import { CreateArquivoDto } from './create-arquivo.dto';

export class UpdateArquivoDto extends PartialType(CreateArquivoDto) {}
