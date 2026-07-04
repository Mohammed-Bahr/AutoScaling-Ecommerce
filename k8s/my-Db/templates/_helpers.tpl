{{/*
Expand the name of the chart.
*/}}
{{- define "database.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- .Chart.Name }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "database.labels" -}}
app: {{ include "database.fullname" . }}
{{- end }}
