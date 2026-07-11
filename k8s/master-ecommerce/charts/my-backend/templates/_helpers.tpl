{{/*
Expand the name of the chart.
*/}}
{{- define "backend.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- .Chart.Name }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "backend.labels" -}}
app: {{ include "backend.fullname" . }}
{{- end }}
